import { TemperatureIndicator } from '../../constants';
import { changeTemperatureIndicator } from './temperature-indicator.actions';
import { initialTemperatureIndicatorState } from './temperature-indicator.state';
import { createReducer, on } from '@ngrx/store';

export const temperatureIndicatorReducer = createReducer(
  initialTemperatureIndicatorState,
  on(changeTemperatureIndicator, (state, action) => ({
    ...state,
    temperatureIndicator: action.newValue,
  }))
);
