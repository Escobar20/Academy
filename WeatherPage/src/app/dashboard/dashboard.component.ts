import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private atributos;

  constructor(private weather: WeatherService ) { }

  ngOnInit() {

    if (!this.weather.atributos) {
      this.weather.getTime2()
      .subscribe((atributos) => {
        this.weather.atributos = atributos;
        // this.Products = products;
        // this.Tra.productosSubject.next(products);
        console.log(atributos);
      },
      (err) => {
        this.weather.handleError(err);
      });
    } else {
      this.atributos = this.weather.atributos;
    }
  }

}
