import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { map } from 'rxjs/operators';


@Injectable()
export class WeatherService {

    readonly KEYWeather = '52014a5500cde66578177e9913b53a89';  // propiedad de clases
    public cityName = 'Monterrey,MX';
    public atributos;
    readonly Params: HttpParams = new HttpParams()
      .set('APPID', this.KEYWeather)
      .set('q', this.cityName);

     constructor( private _http: HttpClient) {

     }

    getForecast(): Observable<any> {
      return this._http.get<Array<any>>('https://api.openweathermap.org/data/2.5/forecast', { params : this.Params})
        .pipe(
          map( data => {
              if (this.checkIfListExcist(data.list)) {
                data.list = data.list.map(value => {
                  value.main.tempC = value.main.temp - 273.15;
                  value.main.temp_maxC = value.main.temp_max - 273.15;
                  value.main.temp_minC = value.main.temp_min - 273.15;
                  return value;
                });
              }
              return data;
          })
        );
    } // End Observable

    getLocationWeather(): Observable<any>{
      return this._http.get<Array<any>>('https://api.openweathermap.org/data/2.5/weather', { params : this.Params});
    }

    public handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
    }

    private checkIfListExcist(Lista): boolean {
      return Lista;
    }

}
