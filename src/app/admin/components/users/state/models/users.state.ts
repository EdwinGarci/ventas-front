import { CRUDState } from "src/app/models/crud.state";
import { User } from "../../models/user.model";

export interface UserState {
    users: Array<User>;
    load: CRUDState;
    create: CRUDState;
    delete: CRUDState;
    update: CRUDState,
    selected: User | null;
}