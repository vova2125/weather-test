import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { WeatherRouting } from './weather-routing.module';
import { WeatherToolbarComponent } from './weather-toolbar/weather-toolbar.component';
import { NbButtonModule, NbCardModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherChartWidgetComponent } from './weather-chart-widget/weather-chart-widget.component';
import { WeatherForecastService } from '../services/weather-forecast.service';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    WeatherComponent,
    WeatherToolbarComponent,
    WeatherChartWidgetComponent
  ],
  imports: [
    HttpClientModule,
    WeatherRouting,
    ReactiveFormsModule,
    NbInputModule,
    NbCardModule,
    NbSpinnerModule,
    NbButtonModule,
    NgxFlagIconCssModule,
    CommonModule
  ],
  providers: [WeatherForecastService],
  exports: [WeatherComponent]
})
export class WeatherModule {
}
