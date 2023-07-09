import { ActionReducerMap } from "@ngrx/store";
import { GlobalAuthState } from "./models/global-auth.state";
import { UIState } from "src/app/models/ui.state";

import { globalAuthReducer } from "./reducers/global-auth.reducer";
import { uiReducer } from "./reducers/ui.reducer";


export interface AppState {
    ui: UIState,
    globalAuth: GlobalAuthState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    ui: uiReducer,
    globalAuth: globalAuthReducer,
}