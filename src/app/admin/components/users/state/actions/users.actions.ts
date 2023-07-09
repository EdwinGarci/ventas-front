import { createAction, props } from '@ngrx/store';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../models/user.model';

// [**LOAD Actions**]

export const loadUsers = createAction(
    '[Users] Load list of users',
);

export const loadedUsers = createAction(
    '[Users] Loaded success',
    props<{ usuarios: User[] }>()
)

export const usersNotFound = createAction(
    '[Users] Load users not found results',
    props<{ error: any }>()
);

// [**CREATE Actions**]

export const createUserInstance = createAction(
    '[Sales] Create instance'
);

export const createUser = createAction(
    '[Users] Create new user',
    props<{ usuario: CreateUserDto }>()
);

export const createdUser = createAction(
    '[Users] Created user success',
    props<{ newUsuario: User }>()
)

export const createUserFailure = createAction(
    '[Users] Create user failure',
    props<{ error: any }>()
);

// [**DELETE Actions**]

export const deleteInstance = createAction(
    '[Users] Delete instance'
);

export const deleteUser = createAction(
    '[Users] Delete user',
    props<{ id: string }>()
);

export const deletedUser = createAction(
    '[Users] Deleted user success',
    props<{ id: string }>()
);

export const deletedUserFailure = createAction(
    '[Users] Deleted user failure',
    props<{ error: any }>()
);

// [**UPDATE Actions**]

export const updateUserInstance = createAction(
    '[Sales] Update user instance'
);

export const updateUser = createAction(
    '[Users] Update user',
    props<{ usuario: UpdateUserDto }>()
);

export const updatedUser = createAction(
    '[Users] Updated user success',
    props<{ usuario: User }>()
)

export const updateUserFailure = createAction(
    '[Users] Update user failure',
    props<{ error: any }>()
);

export const openModal = createAction(
    '[Users] Open Edit Modal',
    props<{ usuario: User }>()
);

export const closeModal = createAction(
    '[Users] Close Edit Modal'
);