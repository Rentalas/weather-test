import { TemperatureIndicator } from '../constants';

export class DailyWeatherModel {
  date: string;
  temperatureMinimum: number;
  temperatureMaximum: number;
  dayWeatherIcon: number;
  nightWeatherIcon: number;
  dayWeatherText: string;
  nightWeatherText: string;
  temperatureIndicator: TemperatureIndicator;

  constructor(
    data: Record<string, any>,
    temperatureIndicator: TemperatureIndicator
  ) {
    this.date = data.Date.split('T')[0] || 'Unknown';
    this.temperatureMinimum = data.Temperature.Minimum.Value || 0;
    this.temperatureMaximum = data.Temperature.Maximum.Value || 0;
    this.dayWeatherIcon = data.Day.Icon || 0;
    this.nightWeatherIcon = data.Night.Icon || 0;
    this.dayWeatherText = data.Day.IconPhrase || 'Unknown';
    this.nightWeatherText = data.Night.IconPhrase || 'Unknown';
    this.temperatureIndicator =
      temperatureIndicator || TemperatureIndicator.celsius;
  }
}
