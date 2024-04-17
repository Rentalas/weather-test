import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  switchMap,
  map,
  catchError,
  tap,
  take,
  withLatestFrom,
  debounceTime,
  debounce,
} from 'rxjs/operators';
import { EMPTY, combineLatest, of } from 'rxjs';
import { City, CityWeather } from '../../abstractions';
import { WeatherService } from '../../services/weather.service';
import {
  addToFavoriteCities,
  addToFavoriteCitiesSuccess,
  fetchFavoriteCitiesWeather,
  fetchFavoriteCitiesWeatherFailure,
  fetchFavoriteCitiesWeatherSuccess,
  removeFromFavoriteCities,
  removeFromFavoriteCitiesSuccess,
} from './favorite-cities.actions';
import { Store, select } from '@ngrx/store';
import { selectFavoriteCities } from './favorite-cities.selector';
import { setLoading } from '../ui/ui.actions';

@Injectable()
export class FavoriteCitiesWeatherEffects {
  private actions$ = inject(Actions);
  private weatherService = inject(WeatherService);
  private store = inject(Store);

  fetchFavoriteCitiesWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchFavoriteCitiesWeather),
      switchMap(({ cities }) => this.weatherService.getCitiesWeather(cities)),
      map((favoriteCitiesWeather: CityWeather[]) =>
        fetchFavoriteCitiesWeatherSuccess({ favoriteCitiesWeather })
      ),
      catchError((error) => of(fetchFavoriteCitiesWeatherFailure({ error }))),
      tap(() => this.store.dispatch(setLoading({ isLoading: false })))
    )
  );

  addToFavoriteCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoriteCities),
      switchMap(({ city }) => {
        return combineLatest([
          of(city),
          this.store.select(selectFavoriteCities).pipe(take(1)),
        ]);
      }),

      tap(([city, cities]) => {
        const citiesToSave = [...cities, city];
        localStorage.setItem('favorite cities', JSON.stringify(citiesToSave));
      }),
      map(([city]) => addToFavoriteCitiesSuccess({ city }))
    )
  );

  removeFromFavoriteCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromFavoriteCities),
      switchMap(({ cityId }) => {
        return combineLatest([
          of(cityId),
          this.store.select(selectFavoriteCities).pipe(take(1)),
        ]);
      }),

      tap(([cityId, cities]) => {
        const filteredCities = cities.filter((city) => city.cityId !== cityId);
        localStorage.setItem('favorite cities', JSON.stringify(filteredCities));
      }),
      map(([cityId]) => removeFromFavoriteCitiesSuccess({ cityId }))
    )
  );
}
