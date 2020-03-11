import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather.component';
import { NgModule } from '@angular/core';

const weatherRoutes: Routes = [
  { path: '', component: WeatherComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(weatherRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WeatherRouting {
}
