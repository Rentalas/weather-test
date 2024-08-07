export interface CurrentWeather {
  temperature: number;
  isDayTime: boolean;
  weatherIcon: number;
  weatherText: string;
}

export interface CurrentWeatherForRender {
  temperature: string;
  isDayTime: boolean;
  weatherIcon: number;
  weatherText: string;
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
}

export interface DailyWeatherForRender {
  date: string;
  temperatureMinimum: string;
  temperatureMaximum: string;
  dayWeatherIcon: number;
  nightWeatherIcon: number;
  dayWeatherText: string;
  nightWeatherText: string;
}

export type CityWeather = CurrentWeather & City;

export type CityWeatherForRender = CurrentWeatherForRender & City;

export type Environment = {
  apiKey: string | null;
  apiHost: string | null;
  apiProtocol: string | null;
};

export type Position = {
  latitude: number;
  longitude: number;
};
