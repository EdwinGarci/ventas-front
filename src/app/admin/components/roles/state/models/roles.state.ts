import { CRUDState } from "src/app/models/crud.state";
import { Role } from "../../models/role.model";

export interface RoleState {
    roles: Array<Role>;
    load: CRUDState;
    create: CRUDState;
    delete: CRUDState;
    update: CRUDState,
    selected: Role | null;
}