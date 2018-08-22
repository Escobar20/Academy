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
    this.weather.getForecast(city).subscribe(
      (data) => {
                this.weather.Details = data;
                console.log(this.weather.Details);
              },
      (err) => {
        this.weather.handleError(err);
    });
  }

}
