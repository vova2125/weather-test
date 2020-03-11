import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather-toolbar',
  templateUrl: './weather-toolbar.component.html',
  styleUrls: ['./weather-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherToolbarComponent implements OnInit {
  @Output() handleWeatherForecastChange: EventEmitter<string> = new EventEmitter<string>();

  location: FormControl = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit() {
  }

  handleEmitWeatherForecast(): void {
    this.handleWeatherForecastChange.emit(this.location.value);
  }
}
