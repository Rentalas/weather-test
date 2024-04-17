import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ICurrentCityFiveDayDailyWeatherState,
  ICurrentCityWeatherState,
} from './current-city.state';

export const selectCurrentCityWeatherState =
  createFeatureSelector<ICurrentCityWeatherState>('currentCityWeather');

export const selectCurrentCityWeather = createSelector(
  selectCurrentCityWeatherState,
  (state: ICurrentCityWeatherState) => state.currentCityWeather
);

export const selectCurrentCityFiveDayDailyWeatherState =
  createFeatureSelector<ICurrentCityFiveDayDailyWeatherState>(
    'currentCityWeather'
  );

export const selectCurrentCityFiveDayDailyWeather = createSelector(
  selectCurrentCityFiveDayDailyWeatherState,
  (state: ICurrentCityFiveDayDailyWeatherState) =>
    state.currentCityFiveDayDailyWeather
);
