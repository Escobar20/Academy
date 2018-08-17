import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Weather } from './Services/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    
  ],
  providers: [
    Weather
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
