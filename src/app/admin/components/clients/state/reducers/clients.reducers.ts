import { createReducer, on } from '@ngrx/store';
import { Client } from '../../models/client.model';
import * as clientsActions from '../actions/clients.actions';
import { AppState as State } from 'src/app/core/state/app.state';
import { ClientState } from '../models/clients.state';

export const initialState: ClientState = {
    load: {
        loading: false,
        errors: null,
        done: false,
    },
    create: {
        loading: false,
        errors: null,
        done: false,
    },
    delete: {
        loading: false,
        errors: null,
        done: false,
    },
    update: {
        loading: false,
        errors: null,
        done: false,
    },
    selected: null,
    clients: [],
};

export interface AppState extends State {
    clientes: ClientState;
}

export const clientsReducer = createReducer(
    initialState,
    // [**LOAD Reducer**]
    on(clientsActions.loadClients, state => {
        return {
            ...state,
            load: { loading: true, errors: null, done: false }
        }
    }),
    on(clientsActions.loadedClients, (state, { clientes }) => {
        return {
            ...state,
            load: { loading: false, errors: null, done: true },
            clients: [...clientes]
        }
    }),
    on(clientsActions.clientsNotFound, (state, { error }) => {
        return {
            ...state,
            load: { loading: false, errors: error, done: false },
        }
    }),
    // [**CREATE Reducer**]
    on(clientsActions.createClientInstance, state => {
        return {
            ...state,
            create: { loading: false, errors: null, done: false },
        }
    }),
    on(clientsActions.createClient, state => {
        return {
            ...state,
            create: { loading: true, errors: null, done: false },
        }
    }),
    on(clientsActions.createdClient, (state, { newCliente }) => {
        return {
            ...state,
            clients: [newCliente, ...state.clients],
            create: { loading: false, errors: null, done: true },
            load: { loading: false, errors: null, done: false },
        }
    }),
    on(clientsActions.createClientFailure, (state, { error }) => {
        return {
            ...state,
            create: { loading: false, errors: error, done: false },
        }
    }),
    // [**DELETE Reducer**]
    on(clientsActions.deleteInstance, state => {
        return {
            ...state,
            delete: { loading: false, errors: null, done: false },
        }
    }),
    on(clientsActions.deleteClient, state => {
        return {
            ...state,
            delete: { loading: true, errors: null, done: false },
        }
    }),
    on(clientsActions.deletedClient, (state, { id }) => {

        const clients: Array<Client> = state.clients.filter(h => h.id !== id);

        if (clients.length == 0) {
            return {
                ...state,
                delete: { loading: false, errors: null, done: true },
                load: { loading: false, errors: ["No hay datos para mostrar"], done: false },
                clients,
            }
        }

        return {
            ...state,
            delete: { loading: false, errors: null, done: true },
            clients,
        }
    }),
    on(clientsActions.deletedClientFailure, (state, { error }) => {
        return {
            ...state,
            delete: { loading: false, errors: error, done: false },
        }
    }),
    // [**UPDATE Reducer**]
    on(clientsActions.updateClientInstance, state => {
        return {
            ...state,
            update: { loading: false, errors: null, done: false },
        }
    }),
    on(clientsActions.updateClient, state => {
        return {
            ...state,
            update: { loading: true, errors: null, done: false },
        }
    }),
    on(clientsActions.updatedClient, (state, { cliente }) => {

        const index = state.clients.findIndex(h => h.id === cliente.id);
        if (index >= 0) {
            const clients = [
                ...state.clients.slice(0, index),
                cliente,
                ...state.clients.slice(index + 1)
            ];
            return {
                ...state,
                clients,
                update: { loading: false, errors: null, done: true },
            };
        }
        return {
            ...state,
            update: { loading: false, errors: null, done: false },
        };
    }),
    on(clientsActions.updateClientFailure, (state, { error }) => {
        return {
            ...state,
            update: { loading: false, errors: error, done: false },
        }
    }),
    // [**Modal Reducer**]
    on(clientsActions.openModal, (state, { cliente }) => {
        return {
            ...state,
            selected: cliente,
        }
    }),
    on(clientsActions.closeModal, (state) => {
        return {
            ...state,
            selected: null,
            update: { loading: false, errors: null, done: false }
        }
    })
);