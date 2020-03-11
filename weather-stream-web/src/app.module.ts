import { WeatherForecastModule } from './weather-forecast/weather-forecast.module';
import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        WeatherForecastModule,
        WeatherModule,
    ],
    controllers: [AppController],
})
export class AppModule {
}
