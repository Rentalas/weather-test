import { createAction, props } from '@ngrx/store';
import { Theme } from '../../constants';

export const changeTheme = createAction(
  '[Theme] Change Theme',
  props<{ newValue: Theme }>()
);
