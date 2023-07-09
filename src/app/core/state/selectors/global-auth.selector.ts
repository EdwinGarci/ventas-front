import { createSelector } from '@ngrx/store';
import { GlobalAuthState } from '../models/global-auth.state';
import { AppState } from '../reducers/global-auth.reducer';

export const selectGlobalAuthFeature = (state: AppState) => state.globalAuth;

export const selectLoginState = createSelector(
    selectGlobalAuthFeature,
    (state: GlobalAuthState) => state.login
);

export const selectUserState = createSelector(
    selectGlobalAuthFeature,
    (state: GlobalAuthState) => state.user
);