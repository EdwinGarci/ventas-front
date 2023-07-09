import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as usersActions from '../actions/users.actions';
import { AppState as State } from 'src/app/core/state/app.state';
import { UserState } from '../models/users.state';

export const initialState: UserState = {
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
    users: [],
};

export interface AppState extends State {
    usuarios: UserState;
}

export const usersReducer = createReducer(
    initialState,
    // [**LOAD Reducer**]
    on(usersActions.loadUsers, state => {
        return {
            ...state,
            load: { loading: true, errors: null, done: false }
        }
    }),
    on(usersActions.loadedUsers, (state, { usuarios }) => {
        return {
            ...state,
            load: { loading: false, errors: null, done: true },
            users: [...usuarios]
        }
    }),
    on(usersActions.usersNotFound, (state, { error }) => {
        return {
            ...state,
            load: { loading: false, errors: error, done: false },
        }
    }),
    // [**CREATE Reducer**]
    on(usersActions.createUserInstance, state => {
        return {
            ...state,
            create: { loading: false, errors: null, done: false },
        }
    }),
    on(usersActions.createUser, state => {
        return {
            ...state,
            create: { loading: true, errors: null, done: false },
        }
    }),
    on(usersActions.createdUser, (state, { newUsuario }) => {
        return {
            ...state,
            users: [newUsuario, ...state.users],
            create: { loading: false, errors: null, done: true },
            load: { loading: false, errors: null, done: false },
        }
    }),
    on(usersActions.createUserFailure, (state, { error }) => {
        return {
            ...state,
            create: { loading: false, errors: error, done: false },
        }
    }),
    // [**DELETE Reducer**]
    on(usersActions.deleteInstance, state => {
        return {
            ...state,
            delete: { loading: false, errors: null, done: false },
        }
    }),
    on(usersActions.deleteUser, state => {
        return {
            ...state,
            delete: { loading: true, errors: null, done: false },
        }
    }),
    on(usersActions.deletedUser, (state, { id }) => {

        const users: Array<User> = state.users.filter(h => h.uuid !== id);

        if (users.length == 0) {
            return {
                ...state,
                delete: { loading: false, errors: null, done: true },
                load: { loading: false, errors: ["No hay datos para mostrar"], done: false },
                users,
            }
        }

        return {
            ...state,
            delete: { loading: false, errors: null, done: true },
            users,
        }
    }),
    on(usersActions.deletedUserFailure, (state, { error }) => {
        return {
            ...state,
            delete: { loading: false, errors: error, done: false },
        }
    }),
    // [**UPDATE Reducer**]
    on(usersActions.updateUserInstance, state => {
        return {
            ...state,
            update: { loading: false, errors: null, done: false },
        }
    }),
    on(usersActions.updateUser, state => {
        return {
            ...state,
            update: { loading: true, errors: null, done: false },
        }
    }),
    on(usersActions.updatedUser, (state, { usuario }) => {

        const index = state.users.findIndex(h => h.uuid === usuario.uuid);
        if (index >= 0) {
            const users = [
                ...state.users.slice(0, index),
                usuario,
                ...state.users.slice(index + 1)
            ];
            return {
                ...state,
                users,
                update: { loading: false, errors: null, done: true },
            };
        }
        return {
            ...state,
            update: { loading: false, errors: null, done: false },
        };
    }),
    on(usersActions.updateUserFailure, (state, { error }) => {
        return {
            ...state,
            update: { loading: false, errors: error, done: false },
        }
    }),
    // [**Modal Reducer**]
    on(usersActions.openModal, (state, { usuario }) => {
        return {
            ...state,
            selected: usuario,
        }
    }),
    on(usersActions.closeModal, (state) => {
        return {
            ...state,
            selected: null,
            update: { loading: false, errors: null, done: false }
        }
    })
);