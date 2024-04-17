import { createReducer, on } from '@ngrx/store';
import {
  getCurrentCityFiveDayDailyWeatherSuccess,
  getCurrentCityWeatherSuccess,
  setCurrentCityWeatherSuccess,
} from './current-city.actions';
import { currentCityWeatherInitialState } from './current-city.state';

export const currentCityWeatherReducer = createReducer(
  currentCityWeatherInitialState,
  on(getCurrentCityWeatherSuccess, (state, { currentCityWeather }) => ({
    ...state,
    currentCityWeather,
  })),
  on(setCurrentCityWeatherSuccess, (state, { currentCityWeather }) => ({
    ...state,
    currentCityWeather,
  })),
  on(
    getCurrentCityFiveDayDailyWeatherSuccess,
    (state, { currentCityFiveDayDailyWeather }) => ({
      ...state,
      currentCityFiveDayDailyWeather,
    })
  )
);
