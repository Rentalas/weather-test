import { initialThemeState } from './theme.state';
import { changeTheme } from './theme.actions';
import { createReducer, on } from '@ngrx/store';

export const themeReducer = createReducer(
  initialThemeState,
  on(changeTheme, (state, { theme }) => ({
    ...state,
    theme,
  }))
);
