import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WeatherService } from '../weather/weather.service';
import { Socket } from 'socket.io';

@WebSocketGateway(3000)
export class WeatherForecastGateway {
    constructor(private weatherService: WeatherService) {
    }

    @SubscribeMessage('startStreamWeatherForecast')
    startStreamWeatherForecast(socket: Socket, location: string): void {
        this.weatherService
            .streamWeatherByLocationName(location)
            .subscribe(weatherForecast => socket.emit('weatherUpdate', weatherForecast))
    }

    @SubscribeMessage('stopStreamWeatherForecast')
    stopStreamWeatherForecast(): void {
        this.weatherService.stopSteamWeatherForecast();
    }
}
