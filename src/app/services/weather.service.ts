import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, forkJoin, map, of } from 'rxjs';
import { City } from '../abstractions';
import { CityWeatherModel } from '../models/city-weather.model';
import { DailyWeatherModel } from '../models/daily-weather.model copy';
import { WeatherApiService } from './weather-api.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherApiService = inject(WeatherApiService);

  getCitiesWeather(cities: City[]): Observable<CityWeatherModel[]> {
    if (!cities.length) {
      return of([]);
    }
    const requests$ = forkJoin(
      cities.map((city) =>
        this.weatherApiService.getCurrentWeather(city.cityId)
      )
    );

    return combineLatest([requests$]).pipe(
      map(([responses]) => this.createCityWeatherModels(responses, cities))
    );
  }

  private createCityWeatherModels(
    responses: Record<string, any>[],
    cities: City[]
  ): CityWeatherModel[] {
    return responses.map((response, index) => {
      const city = cities[index];

      return new CityWeatherModel(response, city);
    });
  }

  getFiveDayDailyWeather(id: string): Observable<DailyWeatherModel[]> {
    return this.weatherApiService.getFiveDayDailyWeather(id);
  }
}
