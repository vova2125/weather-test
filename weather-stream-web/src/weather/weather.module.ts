import { HttpModule, Module } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Module({
    imports: [HttpModule.register({
        baseURL: 'https://api.openweathermap.org/data/2.5',
    })],
    providers: [WeatherService],
    controllers: [],
    exports: [WeatherService]
})
export class WeatherModule {
}
