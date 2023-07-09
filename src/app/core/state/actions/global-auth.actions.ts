import { createAction, props } from "@ngrx/store";
import { AuthResponse } from "../../dto/auth-response";
import { LoginDto } from "../../dto/login.dto";


// [**Global AUTH Login Actions**]
export const loginInstance = createAction(
    '[Global Auth] Log in Instance'
);

export const login = createAction(
    '[Global Auth] Log in',
    props<{ dto: LoginDto }>()
);

export const loggedIn = createAction(
    '[Global Auth] Log in success',
    props<{ user: AuthResponse }>()
)

export const loggedInFailure = createAction(
    '[Global Auth] Log in failure',
    props<{ error: any }>()
);

// [**AUTH Log out Actions**]
export const logout = createAction(
    '[Global Auth] Log out',
);
