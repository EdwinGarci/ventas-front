import { CRUDState } from "../../../models/crud.state";
import { AuthResponse } from "../../dto/auth-response";

export interface GlobalAuthState {
    login: CRUDState;
    user: AuthResponse | null;
}