import { CRUDState } from "src/app/models/crud.state";
import { Service } from "../../models/service.model";

export interface ServiceState {
    services: Array<Service>;
    load: CRUDState;
    create: CRUDState;
    delete: CRUDState;
    update: CRUDState,
    selected: Service | null;
}