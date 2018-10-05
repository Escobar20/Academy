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
  public SaveDatas;
  public Auxiliar = [];

  public selectMetric;

  constructor(public weather: WeatherService) {

   }

  ngOnInit() {

    this.SaveDatas  = localStorage.getItem('DataCities');
    this.weather.atributos = JSON.parse(this.SaveDatas);
    //this.DataCity = this.weather.atributos;
    

    //----------------------------

      this.weather.setMetrics$.subscribe( choose => {
          this.selectMetric = choose;
      }
      )

    //   this.weather.atributos$.subscribe( list => {
    //   this.DataCity = list;
    //  })
    
    //------------------------------

    if (!this.weather.atributos) {
      this.weather.getLocationWeather().subscribe(
            (data) => {
                        localStorage.setItem('DataCities', JSON.stringify (data.list));
                        
                        // data.list.map( res =>{
                        //   switch(res.weather[0].main){
                        //     case 'Clouds': {res.weather[0].main = 'assets/Images/cloudy.png'; break;}
                        //     case 'Clear':{ res.weather[0].main = 'assets/Images/partly_cloudy.png'; break;}
                        //     case 'Haze':{ res.weather[0].main = 'assets/Images/sunny.png'; break;}
                        //     case 'Fog':{ res.weather[0].main = 'assets/Images/snow.png'; break;}
                        //     case 'Rain':{ res.weather[0].main = 'assets/Images/rain.png'; break;}
                        //     case 'Thunderstorm':{ res.weather[0].main = 'assets/Images/light.png'; break;}
                        //   }
                        // });
                        
                        this.DataCity = data.list;                      
                        this.weather.atributos = this.DataCity;
              },
            (error) => console.log(error)
          );
          
   }
    else {
      this.DataCity = this.weather.atributos;
   }

  } // END onInit

  deleteCity(index : number){
    console.log("Antes", this.weather.atributos);

  //   this.weather.atributos.map(
  //               (Lista) => {
  //                 if (Lista.name != city ) { this.Auxiliar.push(Lista); }                
  //               }
  //             );
  //  this.weather.atributos = this.Auxiliar;

   this.DataCity.splice(index, 1); // Delete elements by index
   this.weather.atributos = this.DataCity;
   localStorage.setItem('DataCities', JSON.stringify(this.weather.atributos));
    console.log("nueva lista -> ",this.Auxiliar);

  }

}
