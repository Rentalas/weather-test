import { createAction, props } from '@ngrx/store';
import { City, CityWeather } from '../../abstractions';

export const addToFavoriteCities = createAction(
  '[Favorite Cities] Add To Favorite Cities',
  props<{ city: City }>()
);

export const addToFavoriteCitiesSuccess = createAction(
  '[Favorite Cities] Add To Favorite Cities Success',
  props<{ city: City }>()
);

export const removeFromFavoriteCities = createAction(
  '[Favorite Cities] Remove From Favorite Cities',
  props<{ cityId: string }>()
);

export const removeFromFavoriteCitiesSuccess = createAction(
  '[Favorite Cities] Remove From Favorite Cities Success',
  props<{ cityId: string }>()
);

export const fetchFavoriteCitiesWeather = createAction(
  '[Favorite Cities] Fetch Favorite Cities Weather',
  props<{ cities: City[] }>()
);

export const fetchFavoriteCitiesWeatherSuccess = createAction(
  '[Favorite Cities] Fetch Favorite Cities Weather Success',
  props<{ favoriteCitiesWeather: CityWeather[] }>()
);

export const fetchFavoriteCitiesWeatherFailure = createAction(
  '[Favorite Cities] Fetch Favorite Cities Weather Failure',
  props<{ error: any }>()
);
