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
                        console.log ("la data", data);
                        localStorage.setItem('DataCities', JSON.stringify (data.list));
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

  deleteCity(city : String){
    console.log("Delete", city);
    console.log("Antes", this.weather.atributos);

    this.weather.atributos.map(
                (Lista) => {
                  if (Lista.name != city ) { this.Auxiliar.push(Lista); }                
                }
              );
   this.weather.atributos = this.Auxiliar;
   localStorage.setItem('DataCities', JSON.stringify(this.weather.atributos));
    console.log("nueva lista -> ",this.Auxiliar);

  }

}
