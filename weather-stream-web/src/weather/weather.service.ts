import { HttpService, Injectable, OnModuleDestroy } from '@nestjs/common';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { interval, Subject, throwError } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class WeatherService implements OnModuleDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    constructor(private httpService: HttpService) {
    }

    public onModuleDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    streamWeatherByLocationName(location: string) {
        const API_KEY = process.env.API_KEY;

        return interval(3000)
            .pipe(
                switchMap(() => {
                    return this.httpService
                        .request({
                            url: 'weather',
                            method: 'GET',
                            params: {
                                q: location,
                                appid: API_KEY,
                                units: 'metric'
                            }
                        })
                }),
                map(({ data }) => {
                    const currentTime = moment(new Date()).format('HH:mm');
                    return {
                        ...data,
                        time: currentTime
                    }
                }),
                catchError(error => {
                    return throwError(error)
                }),
                takeUntil(this.destroy$)
            )
    }

    public stopSteamWeatherForecast(): void {
        this.destroy$.next();
    }
}
