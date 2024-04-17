import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITemperatureIndicatorState } from './temperature-indicator.state';

export const selectTemperatureIndicatorState =
  createFeatureSelector<ITemperatureIndicatorState>('temperatureIndicator');

export const selectTemperatureIndicator = createSelector(
  selectTemperatureIndicatorState,
  (state: ITemperatureIndicatorState) => state.temperatureIndicator
);
