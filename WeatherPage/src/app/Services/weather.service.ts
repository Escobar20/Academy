import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHandler, HttpHeaders } from '@angular/common/http';
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

    getTime2(): Observable<any> {
      return this._http.get<Array<any>>('https://api.openweathermap.org/data/2.5/forecast', { params : this.Params})
        .pipe(
          map( data => {
              if (this.checkIfListExcist(data.list)) {
                data.list = data.list.map(dataa => {
                  dataa.main.tempC = dataa.main.temp - 273.15;
                  dataa.main.temp_maxC = dataa.main.temp_max - 273.15;
                  dataa.main.temp_minC = dataa.main.temp_min - 273.15;
                  return dataa;
                });
              }
              console.log(data.list);
              return data;
          })
        );
    } // End Observable

    public handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
    }

    private checkIfListExcist(Lista): boolean {
      return Lista;
    }

}
