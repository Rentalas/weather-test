import { TemperatureIndicator } from './constants';

export interface CurrentWeather {
  temperature: number;
  isDayTime: boolean;
  weatherIcon: number;
  weatherText: string;
  temperatureIndicator?: string;
}

export interface City {
  cityId: string;
  name: string;
}

export interface CityRs {
  LocalizedName: string;
  Key: string;
}

export interface FiveDayDailyWeatherRs {
  DailyForecasts: Record<string, any>[];
}

export interface DailyWeather {
  date: string;
  temperatureMinimum: number;
  temperatureMaximum: number;
  dayWeatherIcon: number;
  nightWeatherIcon: number;
  dayWeatherText: string;
  nightWeatherText: string;
  temperatureIndicator: TemperatureIndicator;
}

export type CityWeather = CurrentWeather & City;

export type Environment = {
  apiKey: string | null;
  apiHost: string | null;
  apiProtocol: string | null;
};

export type Position = {
  latitude: number;
  longitude: number;
};
