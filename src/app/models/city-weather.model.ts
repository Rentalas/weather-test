import { City } from '../abstractions';

export class CityWeatherModel {
  cityId: string;
  name: string;
  temperature: number;
  isDayTime: boolean;
  weatherIcon: number;
  weatherText: string;

  constructor(data: Record<string, any>, city: City) {
    this.cityId = city.cityId;
    this.name = city.name;
    this.temperature = data.temperature || 0;
    this.isDayTime = data.isDayTime || false;
    this.weatherIcon = data.weatherIcon || 0;
    this.weatherText = data.weatherText || 'Unknown';
  }
}
