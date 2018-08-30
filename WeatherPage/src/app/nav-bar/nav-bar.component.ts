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
  public isExist;

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
    this.isExist = false;

    this.weather.atributos.map(
                (Lista) => {
                  console.log(Lista.name);
                  if (Lista.name === this.inputText ) {this.isExist = true;}                 
                }
              );
        
    if (this.inputText!= null && !this.isExist){
                this.weather.getOneLocationWeather(this.inputText).subscribe((info) => {
                  console.log(info);

                  this.weather.atributos.push(info);
   //               this.weather.atributos$.next(this.weather.atributos); //BehaviourSubject
                  localStorage.setItem('DataCities', JSON.stringify(this.weather.atributos));
                  console.log("this.weather.atributos",this.weather.atributos);
                }, (err) => {console.log('No hay ciudad con ese nombre'); this.weather.setMessage$.next(true); });
              
      }
  }

  ClearStorage(){
    localStorage.clear();
  }

}
