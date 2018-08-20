import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private atributos;

  constructor(private weather: WeatherService) { }

  ngOnInit() {
    if (!this.weather.atributos){
      this.weather.getLocationWeather().subscribe(
        (data) => { 
                   data.main.tempC = data.main.temp - 273.15;
                   data.main.temp_maxC = data.main.temp_max - 273.15;
                   data.main.temp_minC = data.main.temp_min - 273.15;
                   this.weather.atributos = data; this.atributos = data;
                   console.log (data);
         },
        (error) => console.log(error)
      );
   }else{
     this.atributos = this.weather.atributos;
   }
  }

}
