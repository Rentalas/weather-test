import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { FiveDayDailyWeatherRs } from '../abstractions';
import { CurrentWeatherModel } from '../models/current-weather.model';
import { DailyWeatherModel } from '../models/daily-weather.model copy';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private http = inject(HttpClient);

  getCurrentWeather(id: string): Observable<CurrentWeatherModel> {
    return this.http
      .get(`./currentconditions/v1/${id}`)
      .pipe(map((cityWeather) => new CurrentWeatherModel(cityWeather)));
  }

  getFiveDayDailyWeather(id: string): Observable<DailyWeatherModel[]> {
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
