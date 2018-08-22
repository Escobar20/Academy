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

  constructor(public weather: WeatherService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      let name;
      name = res['name'];
      console.log('name', name);

      this.weather.getForecast(name).subscribe(
        (data) => {
                  this.weather.Details = data;
                  this.weather.Details = this.weather.Details.list.map(
                    (Lista) => {
                      const fields = Lista.dt_txt.split(' ');
                      return {'dia': fields[0],
                      'hora': fields[1],
                      'temp': Lista.main.temp,
                       'temp_min': Lista.main.temp_min,
                       'temp_max': Lista.main.temp_max};
                    }
                  );
                  let days = this.weather.Details.map(
                    (arreglo) => {
                      return  arreglo.dia;
                    }
                  );
                  days = new Set(days);
                  const ArregloFinal = [];
                  days.forEach(day => {
                    const arreglo = {'Dia': day, 'Horas': []};
                    this.weather.Details.map(
                      (DiaActual) => {
                        if (day === DiaActual.dia) {
                          arreglo.Horas.push({
                            'hora': DiaActual.hora,
                             'temp': DiaActual.temp,
                            'temp_min': DiaActual.temp_min,
                          'temp_max': DiaActual.temp_max});
                        }
                      }
                    );
                    ArregloFinal.push(arreglo);
                  });

                  this.weather.Details = ArregloFinal;
                  console.log(this.weather.Details);
                },
        (err) => {
          this.weather.handleError(err);
      });
    });
  }

}
