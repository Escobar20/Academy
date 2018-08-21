import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  private atributos;
  public DataCity = [];

  constructor(private weather: WeatherService) {

   }

  ngOnInit() {
    if (!this.weather.atributos){
      this.weather.getLocationWeather().subscribe(
            (data) => { 
                        console.log ("la data", data);
                        this.DataCity = data.list;
                       //this.weather.atributos = data; this.atributos = data;
              },
            (error) => console.log(error)

          );
   }else{
     this.atributos = this.weather.atributos;
   }

  }

  // getCelsius(temp){
  //   return temp / 2;
  // }

  




}
