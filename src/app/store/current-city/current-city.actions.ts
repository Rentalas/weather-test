import { createAction, props } from '@ngrx/store';
import {
  ICurrentCityFiveDayDailyWeatherState,
  ICurrentCityWeatherState,
  IGetCurrentCityFiveDayDailyWeatherState,
} from './current-city.state';
import { City } from '../../abstractions';

export const setCurrentCityWeather = createAction(
  '[Current City] Set Current City Weather',
  props<{ city: City }>()
);

export const setCurrentCityWeatherSuccess = createAction(
  '[Current City] Set Current City Weather Success',
  props<ICurrentCityWeatherState>()
);

export const getCurrentCityWeather = createAction(
  '[Current City] Get Current City Weather'
);

export const getCurrentCityWeatherSuccess = createAction(
  '[Current City] Get Current City Weather Success',
  props<ICurrentCityWeatherState>()
);

export const getCurrentCityFiveDayDailyWeather = createAction(
  '[Current City] Get Current City Five Day Daily Weather',
  props<IGetCurrentCityFiveDayDailyWeatherState>()
);

export const getCurrentCityFiveDayDailyWeatherSuccess = createAction(
  '[Current City] Get Current City Five Day Daily Weather Success',
  props<ICurrentCityFiveDayDailyWeatherState>()
);
