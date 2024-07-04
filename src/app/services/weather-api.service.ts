import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { FiveDayDailyWeatherRs } from '../abstractions';
import { TemperatureIndicator } from '../constants';
import { CurrentWeatherModel } from '../models/current-weather.model';
import { DailyWeatherModel } from '../models/daily-weather.model copy';
import { apis } from '../temp/rsp3';
import { city } from '../temp/rsp4';
import { fiveDay } from '../temp/rsp5';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private http = inject(HttpClient);

  getCurrentWeather(id: string): Observable<CurrentWeatherModel> {
    return of(new CurrentWeatherModel(city));
    return this.http
      .get(`./currentconditions/v1/${id}`)
      .pipe(map((cityWeather) => new CurrentWeatherModel(cityWeather)));
  }

  getFiveDayDailyWeather(id: string): Observable<DailyWeatherModel[]> {
    //remove
    const dailyForecasts = fiveDay.DailyForecasts.map(
      (dailyWeather) => new DailyWeatherModel(dailyWeather)
    );
    return of(dailyForecasts)
    return this.http
      .get<FiveDayDailyWeatherRs>(`./forecasts/v1/daily/5day/${id}`, {
        params: { metric: true },
      })
      .pipe(
        map(({ DailyForecasts }) =>
          DailyForecasts.map(
            (dailyWeather) => new DailyWeatherModel(dailyWeather)
          )
        )
      );
  }
}
