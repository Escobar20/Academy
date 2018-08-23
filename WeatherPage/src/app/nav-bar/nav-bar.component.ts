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
  public setMetricsButton = true;

  public MessageOn;

  constructor(private weather: WeatherService) {

   }

  ngOnInit() {
    
    this.weather.setMessage$.subscribe( choose => {
      this.MessageOn = choose;
     })

  }

  changeMetricButton(selected: string){
    console.log(selected);
    
    switch(selected){
      case "Celsius":{ this.weather.setMetrics$.next(1); break;} 
      case "Fahrenheit":{ this.weather.setMetrics$.next(2); break;}
      case "Both": { this.weather.setMetrics$.next(3); break;}
    }
  }

  findLocation() {
    this.weather.setMessage$.next(false);
    console.log(this.inputText);
    if (this.inputText!= null){
                this.weather.getOneLocationWeather(this.inputText).subscribe((info) => {
                  console.log(info);
                  this.weather.atributos.push(info);
                  localStorage.setItem('DataCities', JSON.stringify(this.weather.atributos));
                  console.log(this.weather.atributos);
                }, (err) => {console.log('No hay ciudad con ese nombre'); this.weather.setMessage$.next(true); });
              
      }
  }

}
