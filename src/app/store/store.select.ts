import { createSelector } from '@ngrx/store';
import { TemperatureIndicator } from '../constants';
import {
  selectCurrentCityFiveDayDailyWeather,
  selectCurrentCityWeather,
} from './current-city/current-city.selector';
import { selectFavoriteCitiesWeather } from './favorite-cities/favorite-cities.selector';
import { selectTemperatureIndicator } from './temperature-indicator/temperature-indicator.selector';

const calculateCelsiusToFahrenheit = (temperature: number): string => {
  return ((temperature * 9) / 5 + 32).toFixed(1);
};

export const selectCurrentCityWeatherWithIndicator = createSelector(
  selectCurrentCityWeather,
  selectTemperatureIndicator,
  (currentCityWeather, temperatureIndicator) => {
    if (!currentCityWeather) {
      return null;
    }

    let updatedTemperature = currentCityWeather.temperature + '';

    if (temperatureIndicator === TemperatureIndicator.celsius) {
      updatedTemperature += TemperatureIndicator.celsius;
    }

    if (temperatureIndicator === TemperatureIndicator.fahrenheit) {
      updatedTemperature =
        calculateCelsiusToFahrenheit(currentCityWeather.temperature) +
        TemperatureIndicator.fahrenheit;
    }

    return { ...currentCityWeather, temperature: updatedTemperature };
  }
);

export const selectFavoriteCitiesWithIndicator = createSelector(
  selectFavoriteCitiesWeather,
  selectTemperatureIndicator,
  (favoriteCitiesWeather, temperatureIndicator) => {
    if (!favoriteCitiesWeather) {
      return null;
    }

    return favoriteCitiesWeather.map((cityWeather) => {
      let updatedTemperature = cityWeather.temperature + '';

      if (temperatureIndicator === TemperatureIndicator.celsius) {
        updatedTemperature += TemperatureIndicator.celsius;
      }

      if (temperatureIndicator === TemperatureIndicator.fahrenheit) {
        updatedTemperature =
          calculateCelsiusToFahrenheit(cityWeather.temperature) +
          TemperatureIndicator.fahrenheit;
      }

      return { ...cityWeather, temperature: updatedTemperature };
    });
  }
);

export const selectCurrentCityFiveDayDailyWeatherWithIndicator = createSelector(
  selectCurrentCityFiveDayDailyWeather,
  selectTemperatureIndicator,
  (currentCityFiveDayDailyWeather, temperatureIndicator) => {
    if (!currentCityFiveDayDailyWeather) {
      return null;
    }

    return currentCityFiveDayDailyWeather.map((dailyWeather) => {
      let updatedTemperatureMinimum = dailyWeather.temperatureMinimum + '';
      let updatedTemperatureMaximum = dailyWeather.temperatureMaximum + '';

      if (temperatureIndicator === TemperatureIndicator.celsius) {
        updatedTemperatureMinimum += TemperatureIndicator.celsius;
        updatedTemperatureMaximum += TemperatureIndicator.celsius;
      }

      if (temperatureIndicator === TemperatureIndicator.fahrenheit) {
        updatedTemperatureMinimum =
          calculateCelsiusToFahrenheit(dailyWeather.temperatureMinimum) +
          TemperatureIndicator.fahrenheit;
        updatedTemperatureMaximum =
          calculateCelsiusToFahrenheit(dailyWeather.temperatureMaximum) +
          TemperatureIndicator.fahrenheit;
      }

      return {
        ...dailyWeather,
        temperatureMinimum: updatedTemperatureMinimum,
        temperatureMaximum: updatedTemperatureMaximum,
      };
    });
  }
);
