import { createSelector } from '@ngrx/store';
import { UserState } from '../models/users.state';
import { AppState } from '../reducers/users.reducers';

export const selectUsersFeature = (state: AppState) => state.usuarios;

export const selectUsers = createSelector(
    selectUsersFeature,
    (state: UserState) => state.users
);

export const selectUserLoadState = createSelector(
    selectUsersFeature,
    (state: UserState) => state.load
);

export const selectUserCreateState = createSelector(
    selectUsersFeature,
    (state: UserState) => state.create
);

export const selectUserDeleteState = createSelector(
    selectUsersFeature,
    (state: UserState) => state.delete
);

export const selectUserUpdateState = createSelector(
    selectUsersFeature,
    (state: UserState) => state.update
);

export const selectOpenModal = createSelector(
    selectUsersFeature,
    (state: UserState) => state.selected
);


