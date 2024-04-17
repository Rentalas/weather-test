import { Injectable, OnInit, inject } from '@angular/core';
import { City, CityWeather, DailyWeather } from '../abstractions';
import { Observable, forkJoin, map, take, combineLatest, tap, of } from 'rxjs';
import { WeatherApiService } from './weather-api.service';
import { Store } from '@ngrx/store';
import { selectTemperatureIndicator } from '../store/temperature-indicator/temperature-indicator.selector';
import { TemperatureIndicator } from '../constants';
import { CityWeatherModel } from '../models/city-weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherApiService = inject(WeatherApiService);
  private store = inject(Store);

  getCitiesWeather(cities: City[]): Observable<CityWeatherModel[]> {
    if (!cities.length) {
      return of([]);
    }
    const requests$ = forkJoin(
      cities.map((city) =>
        this.weatherApiService.getCurrentWeather(city.cityId)
      )
    );
    const temperatureIndicator$ = this.getTemparatureIndicator();

    return combineLatest([requests$, temperatureIndicator$]).pipe(
      map(([responses, indicator]) =>
        this.createCityWeatherModels(responses, cities, indicator)
      )
    );
  }

  private getTemparatureIndicator(): Observable<TemperatureIndicator> {
    return this.store.select(selectTemperatureIndicator).pipe(take(1));
  }

  private getTemperature(data: any, indicator: TemperatureIndicator): number {
    return indicator === TemperatureIndicator.celsius
      ? data?.at(0)?.Temperature?.Metric?.Value
      : data?.at(0)?.Temperature?.Imperial?.Value;
  }

  private createCityWeatherModels(
    responses: any[],
    cities: City[],
    temperatureIndicator: TemperatureIndicator
  ): CityWeatherModel[] {
    return responses.map((response, index) => {
      const city = cities[index];

      const temperature = this.getTemperature(response, temperatureIndicator);

      return new CityWeatherModel(
        response,
        city,
        temperatureIndicator,
        temperature
      );
    });
  }

  getFiveDayDailyWeather(
    id: string,
    temperatureIndicator: TemperatureIndicator
  ): Observable<DailyWeather[]> {
    return this.weatherApiService.getFiveDayDailyWeather(
      id,
      temperatureIndicator
    );
  }
}
