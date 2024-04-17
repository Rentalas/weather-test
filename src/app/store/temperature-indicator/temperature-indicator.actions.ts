import { createAction, props } from '@ngrx/store';
import { TemperatureIndicator } from '../../constants';

export const changeTemperatureIndicator = createAction(
  '[Temperature Indicator] Change Temperature Indicator',
  props<{ newValue: TemperatureIndicator }>()
);
