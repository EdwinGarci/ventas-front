import { createSelector } from '@ngrx/store';
import { ClientState } from '../models/clients.state';
import { AppState } from '../reducers/clients.reducers';

export const selectClientsFeature = (state: AppState) => state.clientes;

export const selectClients = createSelector(
    selectClientsFeature,
    (state: ClientState) => state.clients
);

export const selectClientLoadState = createSelector(
    selectClientsFeature,
    (state: ClientState) => state.load
);

export const selectClientCreateState = createSelector(
    selectClientsFeature,
    (state: ClientState) => state.create
);

export const selectClientDeleteState = createSelector(
    selectClientsFeature,
    (state: ClientState) => state.delete
);

export const selectClientUpdateState = createSelector(
    selectClientsFeature,
    (state: ClientState) => state.update
);

export const selectOpenModal = createSelector(
    selectClientsFeature,
    (state: ClientState) => state.selected
);


