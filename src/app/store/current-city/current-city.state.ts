import { CityWeather, DailyWeather } from '../../abstractions';

export interface ICurrentCityWeatherState {
  currentCityWeather: CityWeather;
}

export interface ICurrentCityFiveDayDailyWeatherState {
  currentCityFiveDayDailyWeather: DailyWeather[];
}

export interface IGetCurrentCityFiveDayDailyWeatherState {
  cityId: string;
}

export const currentCityWeatherInitialState: ICurrentCityWeatherState = {
  currentCityWeather: null,
};

export const currentCityFiveDayDailyWeatherInitialState: ICurrentCityFiveDayDailyWeatherState =
  {
    currentCityFiveDayDailyWeather: [],
  };
