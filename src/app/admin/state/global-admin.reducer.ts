// import { createReducer, on } from "@ngrx/store";
// import { GlobalAdminState } from "./global-admin.state";
// import * as authActions from './global-admin.actions';
// import { AppState as State } from "src/app/core/state/app.state";

// export const initialState: GlobalAdminState = {
//     roles: [],
//     load: {
//         loading: false,
//         errors: null,
//         done: false,
//     },
// };

// export interface AppState extends State {
//     globalAdmin: GlobalAdminState;
// }

// export const globalAdminReducer = createReducer(
//     initialState,
//     // [**LOAD Reducer Roles**]
//     on(authActions.loadRoles, state => {
//         return {
//             ...state,
//             load: { loading: true, errors: null, done: false },
//         }
//     }),
//     on(authActions.loadedRoles, (state, { roles }) => {
//         return {
//             ...state,
//             roles: [...roles],
//             load: { loading: false, errors: null, done: true },
//         }
//     }),
//     on(authActions.rolesNotFound, (state, { error }) => {
//         return {
//             ...state,
//             load: { loading: false, errors: error, done: false },
//         }
//     }),
// );