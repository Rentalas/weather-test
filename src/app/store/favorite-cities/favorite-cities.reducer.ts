import { createReducer, on } from '@ngrx/store';
import {
  addToFavoriteCitiesSuccess,
  fetchFavoriteCitiesWeatherSuccess,
  removeFromFavoriteCitiesSuccess
} from './favorite-cities.actions';
import {
  favoriteCitiesInitialState,
  favoriteCitiesWeatherInitialState,
} from './favorite-cities.state';

export const favoriteCitiesWeatherReducer = createReducer(
  favoriteCitiesWeatherInitialState,
  on(fetchFavoriteCitiesWeatherSuccess, (state, { favoriteCitiesWeather }) => ({
    ...state,
    favoriteCitiesWeather: [...favoriteCitiesWeather],
  }))
);

export const favoriteCitiesReducer = createReducer(
  favoriteCitiesInitialState,
  on(addToFavoriteCitiesSuccess, (state, { city }) => ({
    ...state,
    favoriteCities: [...state.favoriteCities, city],
  })),
  on(removeFromFavoriteCitiesSuccess, (state, { cityId }) => ({
    ...state,
    favoriteCities: [
      ...state.favoriteCities.filter((city) => city.cityId !== cityId),
    ],
  }))
);
