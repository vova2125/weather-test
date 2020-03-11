import { Module } from '@nestjs/common';
import { WeatherForecastGateway } from './weather-forecast.gateway';
import { WeatherModule } from '../weather/weather.module';

@Module({
    imports: [WeatherModule],
    providers: [WeatherForecastGateway]
})
export class WeatherForecastModule {
}
