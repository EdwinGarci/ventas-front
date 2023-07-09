import { createSelector } from '@ngrx/store';
import { SupplierState } from '../models/suppliers.state';
import { AppState } from '../reducers/suppliers.reducers';

export const selectSuppliersFeature = (state: AppState) => state.suppliers;

export const selectSuppliers = createSelector(
    selectSuppliersFeature,
    (state: SupplierState) => state.suppliers
);

export const selectSupplierLoadState = createSelector(
    selectSuppliersFeature,
    (state: SupplierState) => state.load
);

export const selectSupplierCreateState = createSelector(
    selectSuppliersFeature,
    (state: SupplierState) => state.create
);

export const selectSupplierDeleteState = createSelector(
    selectSuppliersFeature,
    (state: SupplierState) => state.delete
);

export const selectSupplierUpdateState = createSelector(
    selectSuppliersFeature,
    (state: SupplierState) => state.update
);

export const selectOpenModal = createSelector(
    selectSuppliersFeature,
    (state: SupplierState) => state.selected
);


