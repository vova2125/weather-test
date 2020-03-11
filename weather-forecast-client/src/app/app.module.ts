import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { RouterModule, Routes } from '@angular/router';
import { WeatherModule } from './weather/weather.module';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    WeatherModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NbThemeModule.forRoot(),
    NbLayoutModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
