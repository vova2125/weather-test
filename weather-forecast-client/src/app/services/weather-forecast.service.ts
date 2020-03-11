import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { WEBSOCKET_EVENTS_NAMES } from '../utils/enum';

@Injectable()
export class WeatherForecastService {
  private socket: io.Socket;
  private weatherStreamData$ = new BehaviorSubject([]);
  private readonly dataLimit = 30;

  constructor() {
    this.connect();

    this.socket.on(
      WEBSOCKET_EVENTS_NAMES.UPDATE,
      (currentWeather: any) => {
        let weatherData = this.weatherStreamData$.getValue();
        if (weatherData.length >= this.dataLimit) {
          weatherData = weatherData.splice(1, 20);
        }

        this.weatherStreamData$.next([
            ...weatherData,
          currentWeather
        ]);
      },
    );
  }

  public startStreamWeatherForecast(location: string): void {
    this.socket.emit(WEBSOCKET_EVENTS_NAMES.CONNECT, location);
  }

  public stopStreamWeatherForecast(): void {
    this.socket.emit(WEBSOCKET_EVENTS_NAMES.DISCONNECT);
  }

  public getForecastWeatherStream(): Observable<any> {
    return this.weatherStreamData$.asObservable();
  }

  private connect(): void {
    this.socket = io('http://localhost:3000');
  }
}
