import { createReducer, on } from '@ngrx/store';
import { Role } from '../../models/role.model';
import * as rolesActions from '../actions/roles.actions';
import { AppState as State } from 'src/app/core/state/app.state';
import { RoleState } from '../models/roles.state';

export const initialState: RoleState = {
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
    roles: [],
};

export interface AppState extends State {
    roles: RoleState;
}

export const rolesReducer = createReducer(
    initialState,
    // [**LOAD Reducer**]
    on(rolesActions.loadRoles, state => {
        return {
            ...state,
            load: { loading: true, errors: null, done: false }
        }
    }),
    on(rolesActions.loadedRoles, (state, { roles }) => {
        return {
            ...state,
            load: { loading: false, errors: null, done: true },
            roles: [...roles]
        }
    }),
    on(rolesActions.rolesNotFound, (state, { error }) => {
        return {
            ...state,
            load: { loading: false, errors: error, done: false },
        }
    }),
    // [**CREATE Reducer**]
    on(rolesActions.createRoleInstance, state => {
        return {
            ...state,
            create: { loading: false, errors: null, done: false },
        }
    }),
    on(rolesActions.createRole, state => {
        return {
            ...state,
            create: { loading: true, errors: null, done: false },
        }
    }),
    on(rolesActions.createdRole, (state, { newRol }) => {
        return {
            ...state,
            roles: [newRol, ...state.roles],
            create: { loading: false, errors: null, done: true },
            load: { loading: false, errors: null, done: false },
        }
    }),
    on(rolesActions.createRoleFailure, (state, { error }) => {
        return {
            ...state,
            create: { loading: false, errors: error, done: false },
        }
    }),
    // [**DELETE Reducer**]
    on(rolesActions.deleteInstance, state => {
        return {
            ...state,
            delete: { loading: false, errors: null, done: false },
        }
    }),
    on(rolesActions.deleteRole, state => {
        return {
            ...state,
            delete: { loading: true, errors: null, done: false },
        }
    }),
    on(rolesActions.deletedRole, (state, { id }) => {

        const roles: Array<Role> = state.roles.filter(h => h.id !== id);

        if (roles.length == 0) {
            return {
                ...state,
                delete: { loading: false, errors: null, done: true },
                load: { loading: false, errors: ["No hay datos para mostrar"], done: false },
                roles,
            }
        }

        return {
            ...state,
            delete: { loading: false, errors: null, done: true },
            roles,
        }
    }),
    on(rolesActions.deletedRoleFailure, (state, { error }) => {
        return {
            ...state,
            delete: { loading: false, errors: error, done: false },
        }
    }),
    // [**UPDATE Reducer**]
    on(rolesActions.updateRoleInstance, state => {
        return {
            ...state,
            update: { loading: false, errors: null, done: false },
        }
    }),
    on(rolesActions.updateRole, state => {
        return {
            ...state,
            update: { loading: true, errors: null, done: false },
        }
    }),
    on(rolesActions.updatedRole, (state, { rol }) => {

        const index = state.roles.findIndex(h => h.id === rol.id);
        if (index >= 0) {
            const roles = [
                ...state.roles.slice(0, index),
                rol,
                ...state.roles.slice(index + 1)
            ];
            return {
                ...state,
                roles,
                update: { loading: false, errors: null, done: true },
            };
        }
        return {
            ...state,
            update: { loading: false, errors: null, done: false },
        };
    }),
    on(rolesActions.updateRoleFailure, (state, { error }) => {
        return {
            ...state,
            update: { loading: false, errors: error, done: false },
        }
    }),
    // [**Modal Reducer**]
    on(rolesActions.openModal, (state, { rol }) => {
        return {
            ...state,
            selected: rol,
        }
    }),
    on(rolesActions.closeModal, (state) => {
        return {
            ...state,
            selected: null,
            update: { loading: false, errors: null, done: false }
        }
    })
);