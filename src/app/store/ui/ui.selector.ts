import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UIState } from './ui.state';


export const selectUIState = createFeatureSelector<UIState>('ui');

export const selectIsLoading = createSelector(
  selectUIState,
  (state: UIState) => state.isLoading
);