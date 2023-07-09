import { createAction, props } from '@ngrx/store';
import { CreateSupplierDto } from '../../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../../dto/update-supplier.dto';
import { Supplier } from '../../models/supplier.model';

// [**LOAD Actions**]

export const loadSuppliers = createAction(
    '[Suppliers] Load list of suppliers',
);

export const loadedSuppliers = createAction(
    '[Suppliers] Loaded success',
    props<{ suppliers: Supplier[] }>()
)

export const suppliersNotFound = createAction(
    '[Suppliers] Load suppliers not found results',
    props<{ error: any }>()
);

// [**CREATE Actions**]

export const createSupplierInstance = createAction(
    '[Sales] Create instance'
);

export const createSupplier = createAction(
    '[Suppliers] Create new supplier',
    props<{ supplier: CreateSupplierDto }>()
);

export const createdSupplier = createAction(
    '[Suppliers] Created supplier success',
    props<{ newSupplier: Supplier }>()
)

export const createSupplierFailure = createAction(
    '[Suppliers] Create supplier failure',
    props<{ error: any }>()
);

// [**DELETE Actions**]

export const deleteInstance = createAction(
    '[Suppliers] Delete instance'
);

export const deleteSupplier = createAction(
    '[Suppliers] Delete supplier',
    props<{ id: number }>()
);

export const deletedSupplier = createAction(
    '[Suppliers] Deleted supplier success',
    props<{ id: number }>()
);

export const deletedSupplierFailure = createAction(
    '[Suppliers] Deleted supplier failure',
    props<{ error: any }>()
);

// [**UPDATE Actions**]

export const updateSupplierInstance = createAction(
    '[Sales] Update supplier instance'
);

export const updateSupplier = createAction(
    '[Suppliers] Update supplier',
    props<{ supplier: UpdateSupplierDto }>()
);

export const updatedSupplier = createAction(
    '[Suppliers] Updated supplier success',
    props<{ supplier: Supplier }>()
)

export const updateSupplierFailure = createAction(
    '[Suppliers] Update supplier failure',
    props<{ error: any }>()
);

export const openModal = createAction(
    '[Suppliers] Open Edit Modal',
    props<{ supplier: Supplier }>()
);

export const closeModal = createAction(
    '[Suppliers] Close Edit Modal'
);