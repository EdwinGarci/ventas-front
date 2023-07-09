import { createAction, props } from '@ngrx/store';
import { CreateRoleDto } from '../../dto/create-role.dto';
import { UpdateRoleDto } from '../../dto/update-role.dto';
import { Role } from '../../models/role.model';

// [**LOAD Actions**]

export const loadRoles = createAction(
    '[Roles] Load list of roles',
);

export const loadedRoles = createAction(
    '[Roles] Loaded success',
    props<{ roles: Role[] }>()
)

export const rolesNotFound = createAction(
    '[Roles] Load roles not found results',
    props<{ error: any }>()
);

// [**CREATE Actions**]

export const createRoleInstance = createAction(
    '[Sales] Create instance'
);

export const createRole = createAction(
    '[Roles] Create new role',
    props<{ rol: CreateRoleDto }>()
);

export const createdRole = createAction(
    '[Roles] Created role success',
    props<{ newRol: Role }>()
)

export const createRoleFailure = createAction(
    '[Roles] Create role failure',
    props<{ error: any }>()
);

// [**DELETE Actions**]

export const deleteInstance = createAction(
    '[Roles] Delete instance'
);

export const deleteRole = createAction(
    '[Roles] Delete role',
    props<{ id: number }>()
);

export const deletedRole = createAction(
    '[Roles] Deleted role success',
    props<{ id: number }>()
);

export const deletedRoleFailure = createAction(
    '[Roles] Deleted role failure',
    props<{ error: any }>()
);

// [**UPDATE Actions**]

export const updateRoleInstance = createAction(
    '[Sales] Update role instance'
);

export const updateRole = createAction(
    '[Roles] Update role',
    props<{ rol: UpdateRoleDto }>()
);

export const updatedRole = createAction(
    '[Roles] Updated role success',
    props<{ rol: Role }>()
)

export const updateRoleFailure = createAction(
    '[Roles] Update role failure',
    props<{ error: any }>()
);

export const openModal = createAction(
    '[Roles] Open Edit Modal',
    props<{ rol: Role }>()
);

export const closeModal = createAction(
    '[Roles] Close Edit Modal'
);