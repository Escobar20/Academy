import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public DataCity;
  public inputText;

  constructor(private weather: WeatherService) {

   }

  ngOnInit() {
  }

  findLocation() {
    console.log(this.inputText);
    this.weather.getOneLocationWeather(this.inputText).subscribe((info) => {
      console.log(info);
      this.weather.atributos.push(info);
      console.log(this.weather.atributos);
    }, (err) => {console.log('No hay ciudad con ese nombre'); });
  }

}
