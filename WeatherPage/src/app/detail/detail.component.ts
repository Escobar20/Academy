import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private atributos;

  constructor(private weather: WeatherService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      let name;
      name = res['name'];
      console.log('name', name);

      this.weather.getForecast(name).subscribe(
        (data) => {
                  this.weather.Details = data;
                  console.log(this.weather.Details);
                },
        (err) => {
          this.weather.handleError(err);
      });
    });
  }

}
