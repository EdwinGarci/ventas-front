import { CRUDState } from "./crud.state";
import { AuthResponse } from "./utils/auth-response";

export interface GlobalAuthState {
    login: CRUDState;
    user: AuthResponse | null;
}