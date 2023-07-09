import { CRUDState } from "src/app/models/crud.state";
import { Supplier } from "../../models/supplier.model";

export interface SupplierState {
    suppliers: Array<Supplier>;
    load: CRUDState;
    create: CRUDState;
    delete: CRUDState;
    update: CRUDState,
    selected: Supplier | null;
}