import { createReducer, on } from '@ngrx/store';
import * as ui from '../actions/ui.actions';
import { UIState } from '../../../models/ui.state';

export const initialState: UIState = {
    isLoading: false, alert: null
};

export const uiReducer = createReducer(
    initialState,
    on(ui.isLoading, (state) => {
        return { ...state, isLoading: true }
    }),
    on(ui.stopLoading, (state) => {
        return { ...state, isLoading: false }
    }),
    on(ui.emitAlert, (state, { alert }) => {
        return { ...state, alert }
    })
);