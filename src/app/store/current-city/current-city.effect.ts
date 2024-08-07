import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';

import { Store } from '@ngrx/store';
import { CityService } from '../../services/city.service';
import { setLoading } from '../ui/ui.actions';
import {
  getCurrentCityFiveDayDailyWeather,
  getCurrentCityFiveDayDailyWeatherSuccess,
  getCurrentCityWeather,
  getCurrentCityWeatherSuccess,
  setCurrentCityWeather,
  setCurrentCityWeatherSuccess,
} from './current-city.actions';

@Injectable()
export class CurrentCityWeatherEffects {
  private actions$ = inject(Actions);
  private cityService = inject(CityService);
  private weatherService = inject(WeatherService);
  private store = inject(Store);

  setCurrentCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCurrentCityWeather),
      switchMap(({ city }) => this.cityService.getCurrentCityWeather(city)),
      map((currentCityWeather) =>
        setCurrentCityWeatherSuccess({ currentCityWeather })
      ),
      tap(({ currentCityWeather }) => {
        this.store.dispatch(
          getCurrentCityFiveDayDailyWeather({
            cityId: currentCityWeather.cityId,
          })
        );
      }),
      tap(() => this.store.dispatch(setLoading({ isLoading: false })))
    )
  );

  getCurrentCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentCityWeather),
      switchMap(() => this.cityService.getCurrentCityWeather()),
      map((currentCityWeather) =>
        getCurrentCityWeatherSuccess({ currentCityWeather })
      ),
      tap(({ currentCityWeather }) => {
        this.store.dispatch(
          getCurrentCityFiveDayDailyWeather({
            cityId: currentCityWeather.cityId,
          })
        );
      }),
      tap(() => this.store.dispatch(setLoading({ isLoading: false })))
    )
  );

  getCurrentCityFiveDayDailyWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentCityFiveDayDailyWeather),
      switchMap(({ cityId }) => {
        return this.weatherService.getFiveDayDailyWeather(cityId);
      }),
      map((currentCityFiveDayDailyWeather) =>
        getCurrentCityFiveDayDailyWeatherSuccess({
          currentCityFiveDayDailyWeather,
        })
      )
    )
  );
}
