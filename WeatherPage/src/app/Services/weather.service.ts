import { Injectable } from "@angular/core";
import { HttpClient } from "../../../node_modules/@types/selenium-webdriver/http";

@Injectable()
export class Weather {

     readonly KEYWeather = "52014a5500cde66578177e9913b53a89";  //propiedad de clases

     constructor( private _http : HttpClient){

     }

}