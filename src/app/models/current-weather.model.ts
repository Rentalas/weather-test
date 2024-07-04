export class CurrentWeatherModel {
  temperature: number;
  isDayTime: boolean;
  weatherIcon: number;
  weatherText: string;

  constructor(data: Record<string, any>) {
    this.temperature = data.at(0).Temperature?.Metric?.Value || 0;
    this.isDayTime = data.at(0).IsDayTime || false;
    this.weatherIcon = data.at(0).WeatherIcon || 0;
    this.weatherText = data.at(0).WeatherText || 'Unknown';
  }
}
