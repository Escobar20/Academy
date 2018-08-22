import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private atributos;

  constructor(private weather: WeatherService) { }

  ngOnInit() {
    if (!this.weather.atributos) {
      this.weather.getForecast().subscribe(
        (data) => {
                  // this.weather.atributos = data;
                  this.atributos = data;
                  console.log(data);
                },
        (err) => {
          this.weather.handleError(err);
      });
    } else {
      this.atributos = this.weather.atributos;
    }
  }

}
