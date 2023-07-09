import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { emitAlert } from '../../../../../core/state/actions/ui.actions';
import { SupplierService } from '../../services/supplier.service';
import * as suppliersActions from '../actions/suppliers.actions';

@Injectable()
export class SuppliersEffects {

    loadSuppliers$ = createEffect(() => this.actions$.pipe(
        ofType(suppliersActions.loadSuppliers),
        mergeMap(() => this.suppliersService.getSuppliers()
            .pipe(
                mergeMap(suppliers => [
                    suppliersActions.loadedSuppliers({ suppliers: suppliers }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(suppliersActions.suppliersNotFound({ error: response }))
                }
                )
            ))
    )
    );

    createSupplier$ = createEffect(() => this.actions$.pipe(
        ofType(suppliersActions.createSupplier),
        mergeMap((params) => this.suppliersService.saveSupplier(params.supplier)
            .pipe(
                mergeMap(supplier => [
                    suppliersActions.createdSupplier({ newSupplier: supplier }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(suppliersActions.createSupplierFailure({ error: response }))
                })
            ))
    )
    );

    deleteSupplier$ = createEffect(() => this.actions$.pipe(
        ofType(suppliersActions.deleteSupplier),
        mergeMap((params) => this.suppliersService.deleteSupplier(params.id)
            .pipe(
                mergeMap(response => [
                    suppliersActions.deletedSupplier({ id: params.id }),
                    emitAlert({ alert: { tittle: "Correcto", message: "Eliminado correctamente", type: "success" } })
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(emitAlert({ alert: { tittle: "Error", message: "Algo salio mal", type: "error" } }),
                        suppliersActions.deletedSupplierFailure({ error: { errors: response, action: "delete" } })
                    )
                })
            ))
    )
    );

    updateSupplier$ = createEffect(() => this.actions$.pipe(
        ofType(suppliersActions.updateSupplier),
        mergeMap((params) => this.suppliersService.updateSupplier(params.supplier)
            .pipe(
                mergeMap(supplier => [
                    suppliersActions.updatedSupplier({ supplier: supplier }),
                    emitAlert({ alert: { tittle: "Correcto", message: "Actualizado correctamente", type: "success" } }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(suppliersActions.updateSupplierFailure({ error: response }))
                })
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private suppliersService: SupplierService,
        public router: Router
    ) { }
}