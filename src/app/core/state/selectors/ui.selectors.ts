import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';
import { UIState } from '../../../models/ui.state';

export const selectUIFeature = (state: AppState) => state.ui;

export const selectUILoading = createSelector(
    selectUIFeature,
    (state: UIState) => state.isLoading
);

export const selectAlert = createSelector(
    selectUIFeature,
    (state: UIState) => state.alert
);

