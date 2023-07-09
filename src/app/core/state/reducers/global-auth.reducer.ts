import { createReducer, on } from "@ngrx/store";
import * as authActions from '../actions/global-auth.actions';
import { AppState as State } from '../../state/app.state';
import { GlobalAuthState } from "../models/global-auth.state";

export const initialState: GlobalAuthState = {
    login: {
        loading: false,
        errors: null,
        done: false,
    },
    user: null
};

export interface AppState extends State {
    globalAuth: GlobalAuthState;
}

export const globalAuthReducer = createReducer(
    initialState,
    // [**LOAD Reducer**]
    on(authActions.logout, state => {
        return {
            ...state,
            user: null,
            login: { loading: false, errors: null, done: false },
        }
    }),

    // // [**Login Reducer**]
    on(authActions.loginInstance, state => {
        return {
            ...state,
            login: { loading: false, errors: null, done: false },
        }
    }),
    on(authActions.login, state => {
        return {
            ...state,
            login: { loading: true, errors: null, done: false },
        }
    }),
    on(authActions.loggedIn, (state, { user }) => {
        return {
            ...state,
            user,
            login: { loading: false, errors: null, done: true },
        }
    }),
    on(authActions.loggedInFailure, (state, { error }) => {
        return {
            ...state,
            login: { loading: false, errors: error, done: false },
        }
    }),
);