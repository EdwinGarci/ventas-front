import { createSelector } from '@ngrx/store';
import { RoleState } from '../models/roles.state';
import { AppState } from '../reducers/roles.reducers';

export const selectRolesFeature = (state: AppState) => state.roles;

export const selectRoles = createSelector(
    selectRolesFeature,
    (state: RoleState) => state.roles
);

export const selectRoleLoadState = createSelector(
    selectRolesFeature,
    (state: RoleState) => state.load
);

export const selectRoleCreateState = createSelector(
    selectRolesFeature,
    (state: RoleState) => state.create
);

export const selectRoleDeleteState = createSelector(
    selectRolesFeature,
    (state: RoleState) => state.delete
);

export const selectRoleUpdateState = createSelector(
    selectRolesFeature,
    (state: RoleState) => state.update
);

export const selectOpenModal = createSelector(
    selectRolesFeature,
    (state: RoleState) => state.selected
);


