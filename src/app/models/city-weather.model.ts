import { City } from '../abstractions';
import { TemperatureIndicator } from '../constants';

export class CityWeatherModel {
  cityId: string;
  name: string;
  temperature: number;
  isDayTime: boolean;
  weatherIcon: number;
  weatherText: string;

  constructor(
    data: Record<string, any>,
    city: City,
    public temperatureIndicator: TemperatureIndicator,
    temperature: number
  ) {
    this.cityId = city.cityId;
    this.name = city.name;
    this.temperature = temperature || 0;
    this.isDayTime = data.at(0).IsDayTime || false;
    this.weatherIcon = data.at(0).WeatherIcon || 0;
    this.weatherText = data.at(0).WeatherText || 'Unknown';
  }
}
