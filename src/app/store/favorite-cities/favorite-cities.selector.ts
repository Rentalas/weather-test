import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IFavoriteCitiesState,
  IFavoriteCitiesWeatherState,
} from './favorite-cities.state';

export const selectFavoriteCitiesState =
  createFeatureSelector<IFavoriteCitiesState>('favoriteCities');

export const selectFavoriteCitiesWeatherState =
  createFeatureSelector<IFavoriteCitiesWeatherState>('favoriteCitiesWeather');

export const selectFavoriteCities = createSelector(
  selectFavoriteCitiesState,
  (state: IFavoriteCitiesState) => state.favoriteCities
);

export const selectFavoriteCitiesWeather = createSelector(
  selectFavoriteCitiesWeatherState,
  (state: IFavoriteCitiesWeatherState) => state.favoriteCitiesWeather
);
