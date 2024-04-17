import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FiveDayDailyWeatherRs } from '../abstractions';
import { TemperatureIndicator } from '../constants';
import { DailyWeatherModel } from '../models/daily-weather.model copy';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private http = inject(HttpClient);

  getCurrentWeather(id: string) {
    return this.http.get(`./currentconditions/v1/${id}`);
  }

  getFiveDayDailyWeather(
    id: string,
    temperatureIndicator: TemperatureIndicator
  ): Observable<DailyWeatherModel[]> {
    const isMetric = temperatureIndicator === TemperatureIndicator.celsius;

    return this.http
      .get<FiveDayDailyWeatherRs>(`./forecasts/v1/daily/5day/${id}`, {
        params: { metric: isMetric },
      })
      .pipe(
        map(({ DailyForecasts }) =>
          DailyForecasts.map(
            (dailyWeather) =>
              new DailyWeatherModel(dailyWeather, temperatureIndicator)
          )
        )
      );
  }
}
