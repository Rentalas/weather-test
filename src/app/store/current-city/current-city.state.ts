import { CityWeather, DailyWeather } from '../../abstractions';
import { TemperatureIndicator } from '../../constants';

export interface ICurrentCityWeatherState {
  currentCityWeather: CityWeather;
}

export interface ICurrentCityFiveDayDailyWeatherState {
  currentCityFiveDayDailyWeather: DailyWeather[];
}

export interface IGetCurrentCityFiveDayDailyWeatherState {
  cityId: string;
  temperatureIndicator: TemperatureIndicator;
}

export const currentCityWeatherInitialState: ICurrentCityWeatherState = {
  currentCityWeather: null,
};

export const currentCityFiveDayDailyWeatherInitialState: ICurrentCityFiveDayDailyWeatherState =
  {
    currentCityFiveDayDailyWeather: [],
  };
