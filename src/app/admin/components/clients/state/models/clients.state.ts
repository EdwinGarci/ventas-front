import { CRUDState } from "src/app/models/crud.state";
import { Client } from "../../models/client.model";

export interface ClientState {
    clients: Array<Client>;
    load: CRUDState;
    create: CRUDState;
    delete: CRUDState;
    update: CRUDState,
    selected: Client | null;
}