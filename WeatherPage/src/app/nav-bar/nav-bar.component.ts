import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public DataCity;

  constructor(private weather: WeatherService) {

   }

  ngOnInit() {
    
  }

  //   searchButton(){
  //   this.weather.searchLocationWeather(city) {
  //     this.weather.searchLocationWeather(city).subscribe(res => {
  //     this.DataCity = cities.map(
  //           (city) => { return {Name: city.name, ID: city.id , Country: city.country}}
  //         );
  //       console.log( JSON.stringify(this.DataCity));
  //     })
  //   }
  // }
  

}
