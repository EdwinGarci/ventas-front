import { createSelector } from '@ngrx/store';
import { ServiceState } from '../models/services.state';
import { AppState } from '../reducers/services.reducers';

export const selectServicesFeature = (state: AppState) => state.services;

export const selectServices = createSelector(
    selectServicesFeature,
    (state: ServiceState) => state.services
);

export const selectServiceLoadState = createSelector(
    selectServicesFeature,
    (state: ServiceState) => state.load
);

export const selectServiceCreateState = createSelector(
    selectServicesFeature,
    (state: ServiceState) => state.create
);

export const selectServiceDeleteState = createSelector(
    selectServicesFeature,
    (state: ServiceState) => state.delete
);

export const selectServiceUpdateState = createSelector(
    selectServicesFeature,
    (state: ServiceState) => state.update
);

export const selectOpenModal = createSelector(
    selectServicesFeature,
    (state: ServiceState) => state.selected
);


