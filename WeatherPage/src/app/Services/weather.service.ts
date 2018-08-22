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
    public Details;

    readonly ParamsId: HttpParams = new HttpParams()
    .set('APPID', this.KEYWeather)
    .set('id', this.cityIDS);

     constructor( private _http: HttpClient) {

     }

    getForecast(city): Observable<any> {
      const Params: HttpParams = new HttpParams()
      .set('APPID', this.KEYWeather)
      .set('q', city);
      return this._http.get<Array<any>>('https://api.openweathermap.org/data/2.5/forecast', { params : Params})
        .pipe(
          map( data => {
              return data;
          })
        );
    }

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


}
