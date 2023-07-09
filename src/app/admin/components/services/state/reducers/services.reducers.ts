import { createReducer, on } from '@ngrx/store';
import { Service } from '../../models/service.model';
import * as servicesActions from '../actions/services.actions';
import { AppState as State } from 'src/app/core/state/app.state';
import { ServiceState } from '../models/services.state';

export const initialState: ServiceState = {
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
    services: [],
};

export interface AppState extends State {
    services: ServiceState;
}

export const servicesReducer = createReducer(
    initialState,
    // [**LOAD Reducer**]
    on(servicesActions.loadServices, state => {
        return {
            ...state,
            load: { loading: true, errors: null, done: false }
        }
    }),
    on(servicesActions.loadedServices, (state, { services }) => {
        return {
            ...state,
            load: { loading: false, errors: null, done: true },
            services: [...services]
        }
    }),
    on(servicesActions.servicesNotFound, (state, { error }) => {
        return {
            ...state,
            load: { loading: false, errors: error, done: false },
        }
    }),
    // [**CREATE Reducer**]
    on(servicesActions.createServiceInstance, state => {
        return {
            ...state,
            create: { loading: false, errors: null, done: false },
        }
    }),
    on(servicesActions.createService, state => {
        return {
            ...state,
            create: { loading: true, errors: null, done: false },
        }
    }),
    on(servicesActions.createdService, (state, { newService }) => {
        return {
            ...state,
            services: [newService, ...state.services],
            create: { loading: false, errors: null, done: true },
            load: { loading: false, errors: null, done: false },
        }
    }),
    on(servicesActions.createServiceFailure, (state, { error }) => {
        return {
            ...state,
            create: { loading: false, errors: error, done: false },
        }
    }),
    // [**DELETE Reducer**]
    on(servicesActions.deleteInstance, state => {
        return {
            ...state,
            delete: { loading: false, errors: null, done: false },
        }
    }),
    on(servicesActions.deleteService, state => {
        return {
            ...state,
            delete: { loading: true, errors: null, done: false },
        }
    }),
    on(servicesActions.deletedService, (state, { id }) => {

        const services: Array<Service> = state.services.filter(h => h.id !== id);

        if (services.length == 0) {
            return {
                ...state,
                delete: { loading: false, errors: null, done: true },
                load: { loading: false, errors: ["No hay datos para mostrar"], done: false },
                services,
            }
        }

        return {
            ...state,
            delete: { loading: false, errors: null, done: true },
            services,
        }
    }),
    on(servicesActions.deletedServiceFailure, (state, { error }) => {
        return {
            ...state,
            delete: { loading: false, errors: error, done: false },
        }
    }),
    // [**UPDATE Reducer**]
    on(servicesActions.updateServiceInstance, state => {
        return {
            ...state,
            update: { loading: false, errors: null, done: false },
        }
    }),
    on(servicesActions.updateService, state => {
        return {
            ...state,
            update: { loading: true, errors: null, done: false },
        }
    }),
    on(servicesActions.updatedService, (state, { service }) => {

        const index = state.services.findIndex(h => h.id === service.id);
        if (index >= 0) {
            const services = [
                ...state.services.slice(0, index),
                service,
                ...state.services.slice(index + 1)
            ];
            return {
                ...state,
                services,
                update: { loading: false, errors: null, done: true },
            };
        }
        return {
            ...state,
            update: { loading: false, errors: null, done: false },
        };
    }),
    on(servicesActions.updateServiceFailure, (state, { error }) => {
        return {
            ...state,
            update: { loading: false, errors: error, done: false },
        }
    }),
    // [**Modal Reducer**]
    on(servicesActions.openModal, (state, { service }) => {
        return {
            ...state,
            selected: service,
        }
    }),
    on(servicesActions.closeModal, (state) => {
        return {
            ...state,
            selected: null,
            update: { loading: false, errors: null, done: false }
        }
    })
);