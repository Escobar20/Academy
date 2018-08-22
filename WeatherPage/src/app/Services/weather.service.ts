import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { map } from 'rxjs/operators';


@Injectable()
export class WeatherService {

    readonly KEYWeather = '52014a5500cde66578177e9913b53a89';  // propiedad de clases
    public cityName = 'Monterrey,MX';
    public cityIDS = '3995465,4005539,4024597,3996063,5128638,3925227,3609673,7871777';
    public metric = 'metric'; // metric - imperial
    // Esto deberia ser variable para convertir C - F
    public atributos;

    readonly Params: HttpParams = new HttpParams()
    .set('APPID', this.KEYWeather)
    .set('q', this.cityName);

    readonly ParamsId: HttpParams = new HttpParams()
    .set('APPID', this.KEYWeather)
    .set('id', this.cityIDS);

     constructor( private _http: HttpClient) {

     }

    getForecast(): Observable<any> {
      return this._http.get<Array<any>>('https://api.openweathermap.org/data/2.5/forecast', { params : this.Params})
        .pipe(
          map( data => {
              // if (this.checkIfListExcist(data.list)) {
              //   data.list = data.list.map(value => {
              //     value.main.tempC = value.main.temp - 273.15;
              //     value.main.temp_maxC = value.main.temp_max - 273.15;
              //     value.main.temp_minC = value.main.temp_min - 273.15;
              //     return value;
              //   });
              // }
              return data;
          })
        );
    } // End Observable

    getLocationWeather(): Observable<any> {
      return this._http.get<Array<any>>('https://api.openweathermap.org/data/2.5/group', { params : this.ParamsId});
    }

    getOneLocationWeather(city): Observable<any> {
      const OneParams: HttpParams = new HttpParams()
      .set('APPID', this.KEYWeather)
      .set('q', city);
      return this._http.get<Array<any>>('https://api.openweathermap.org/data/2.5/weather', { params : OneParams});
    }

    public handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
    }

    private checkIfListExcist(Lista): boolean {
      return Lista;
    }

    searchLocationWeather(city): Observable<any> {
      return this._http.get('http://api.openweathermap.org/data/2.5/find?q=${city}&APPID=${KEYWeather}')
    }


}
