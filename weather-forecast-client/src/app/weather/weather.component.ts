import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { STREAM_FORECAST_STATUS } from '../utils/enum';
import { WEATHER_BUTTON_TITLE } from '../utils/constants/weather.constants';
import { Subject } from 'rxjs';
import { WeatherForecastService } from '../services/weather-forecast.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnInit, OnDestroy {
  streamStatus: STREAM_FORECAST_STATUS = STREAM_FORECAST_STATUS.INACTIVE;
  streamWeatherData;

  private destroy$: Subject<void> = new Subject<void>();

  get buttonContent(): string {
    return WEATHER_BUTTON_TITLE[this.streamStatus];
  }

  get loadingStatus(): boolean {
    return Boolean(this.streamStatus && this.streamWeatherData && !this.streamWeatherData.length)
  }

  constructor(private weatherForecastService: WeatherForecastService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.weatherForecastService.getForecastWeatherStream()
      .pipe(takeUntil(this.destroy$))
      .subscribe(currentWeather => {
        this.streamWeatherData = currentWeather;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  stopSteamWeatherForecast(): void {
    this.weatherForecastService.stopStreamWeatherForecast();
  }

  startStreamWeatherForecast(location: string): void {
    this.streamStatus = this.streamStatus
      ? STREAM_FORECAST_STATUS.INACTIVE
      : STREAM_FORECAST_STATUS.ACTIVE;

    this.weatherForecastService.startStreamWeatherForecast(location);
  }
}
