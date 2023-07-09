import { createReducer, on } from '@ngrx/store';
import { Supplier } from '../../models/supplier.model';
import * as suppliersActions from '../actions/suppliers.actions';
import { AppState as State } from 'src/app/core/state/app.state';
import { SupplierState } from '../models/suppliers.state';

export const initialState: SupplierState = {
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
    suppliers: [],
};

export interface AppState extends State {
    suppliers: SupplierState;
}

export const suppliersReducer = createReducer(
    initialState,
    // [**LOAD Reducer**]
    on(suppliersActions.loadSuppliers, state => {
        return {
            ...state,
            load: { loading: true, errors: null, done: false }
        }
    }),
    on(suppliersActions.loadedSuppliers, (state, { suppliers }) => {
        return {
            ...state,
            load: { loading: false, errors: null, done: true },
            suppliers: [...suppliers]
        }
    }),
    on(suppliersActions.suppliersNotFound, (state, { error }) => {
        return {
            ...state,
            load: { loading: false, errors: error, done: false },
        }
    }),
    // [**CREATE Reducer**]
    on(suppliersActions.createSupplierInstance, state => {
        return {
            ...state,
            create: { loading: false, errors: null, done: false },
        }
    }),
    on(suppliersActions.createSupplier, state => {
        return {
            ...state,
            create: { loading: true, errors: null, done: false },
        }
    }),
    on(suppliersActions.createdSupplier, (state, { newSupplier }) => {
        return {
            ...state,
            suppliers: [newSupplier, ...state.suppliers],
            create: { loading: false, errors: null, done: true },
            load: { loading: false, errors: null, done: false },
        }
    }),
    on(suppliersActions.createSupplierFailure, (state, { error }) => {
        return {
            ...state,
            create: { loading: false, errors: error, done: false },
        }
    }),
    // [**DELETE Reducer**]
    on(suppliersActions.deleteInstance, state => {
        return {
            ...state,
            delete: { loading: false, errors: null, done: false },
        }
    }),
    on(suppliersActions.deleteSupplier, state => {
        return {
            ...state,
            delete: { loading: true, errors: null, done: false },
        }
    }),
    on(suppliersActions.deletedSupplier, (state, { id }) => {

        const suppliers: Array<Supplier> = state.suppliers.filter(h => h.id !== id);

        if (suppliers.length == 0) {
            return {
                ...state,
                delete: { loading: false, errors: null, done: true },
                load: { loading: false, errors: ["No hay datos para mostrar"], done: false },
                suppliers,
            }
        }

        return {
            ...state,
            delete: { loading: false, errors: null, done: true },
            suppliers,
        }
    }),
    on(suppliersActions.deletedSupplierFailure, (state, { error }) => {
        return {
            ...state,
            delete: { loading: false, errors: error, done: false },
        }
    }),
    // [**UPDATE Reducer**]
    on(suppliersActions.updateSupplierInstance, state => {
        return {
            ...state,
            update: { loading: false, errors: null, done: false },
        }
    }),
    on(suppliersActions.updateSupplier, state => {
        return {
            ...state,
            update: { loading: true, errors: null, done: false },
        }
    }),
    on(suppliersActions.updatedSupplier, (state, { supplier }) => {

        const index = state.suppliers.findIndex(h => h.id === supplier.id);
        if (index >= 0) {
            const suppliers = [
                ...state.suppliers.slice(0, index),
                supplier,
                ...state.suppliers.slice(index + 1)
            ];
            return {
                ...state,
                suppliers,
                update: { loading: false, errors: null, done: true },
            };
        }
        return {
            ...state,
            update: { loading: false, errors: null, done: false },
        };
    }),
    on(suppliersActions.updateSupplierFailure, (state, { error }) => {
        return {
            ...state,
            update: { loading: false, errors: error, done: false },
        }
    }),
    // [**Modal Reducer**]
    on(suppliersActions.openModal, (state, { supplier }) => {
        return {
            ...state,
            selected: supplier,
        }
    }),
    on(suppliersActions.closeModal, (state) => {
        return {
            ...state,
            selected: null,
            update: { loading: false, errors: null, done: false }
        }
    })
);