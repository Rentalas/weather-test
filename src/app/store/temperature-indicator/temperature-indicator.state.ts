import { TemperatureIndicator } from '../../constants';

export interface ITemperatureIndicatorState {
  temperatureIndicator: TemperatureIndicator;
}

const temperatureIndicator =
  (localStorage.getItem('temperature indicator') as TemperatureIndicator) ||
  TemperatureIndicator.celsius;

export const initialTemperatureIndicatorState: ITemperatureIndicatorState = {
  temperatureIndicator: temperatureIndicator,
};
