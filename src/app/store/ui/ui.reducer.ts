import { createReducer, on } from '@ngrx/store';
import { setLoading } from './ui.actions';
import { initialState } from './ui.state';

export const uiReducer = createReducer(
  initialState,
  on(setLoading, (state, { isLoading }) => ({
    ...state,
    isLoading: isLoading,
  }))
);
