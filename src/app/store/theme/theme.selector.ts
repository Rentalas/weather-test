import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IThemeState } from './theme.state';

export const selectThemeState = createFeatureSelector<IThemeState>('theme');

export const selectTheme = createSelector(
  selectThemeState,
  (state: IThemeState) => state.theme
);
