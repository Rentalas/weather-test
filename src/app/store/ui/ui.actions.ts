import { createAction, props } from '@ngrx/store';

export const setLoading = createAction('[UI] Set Loading', props<{ isLoading: boolean }>());