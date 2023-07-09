import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { emitAlert } from '../../../../../core/state/actions/ui.actions';
import { RoleService } from '../../services/role.service';
import * as rolesActions from '../actions/roles.actions';



@Injectable()
export class RolesEffects {

    loadRoles$ = createEffect(() => this.actions$.pipe(
        ofType(rolesActions.loadRoles),
        mergeMap(() => this.rolesService.getRoles()
            .pipe(
                mergeMap(roles => [
                    rolesActions.loadedRoles({ roles: roles }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(rolesActions.rolesNotFound({ error: response }))
                }
                )
            ))
    )
    );

    createRole$ = createEffect(() => this.actions$.pipe(
        ofType(rolesActions.createRole),
        mergeMap((params) => this.rolesService.saveRole(params.rol)
            .pipe(
                mergeMap(role => [
                    rolesActions.createdRole({ newRol: role }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(rolesActions.createRoleFailure({ error: response }))
                })
            ))
    )
    );

    deleteRole$ = createEffect(() => this.actions$.pipe(
        ofType(rolesActions.deleteRole),
        mergeMap((params) => this.rolesService.deleteRole(params.id)
            .pipe(
                mergeMap(response => [
                    rolesActions.deletedRole({ id: params.id }),
                    emitAlert({ alert: { tittle: "Correcto", message: "Eliminado correctamente", type: "success" } })
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(emitAlert({ alert: { tittle: "Error", message: "Algo salio mal", type: "error" } }),
                        rolesActions.deletedRoleFailure({ error: { errors: response, action: "delete" } })
                    )
                })
            ))
    )
    );

    updateRole$ = createEffect(() => this.actions$.pipe(
        ofType(rolesActions.updateRole),
        mergeMap((params) => this.rolesService.updateRole(params.rol)
            .pipe(
                mergeMap(role => [
                    rolesActions.updatedRole({ rol: role }),
                    emitAlert({ alert: { tittle: "Correcto", message: "Actualizado correctamente", type: "success" } }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(rolesActions.updateRoleFailure({ error: response }))
                })
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private rolesService: RoleService,
        public router: Router
    ) { }
}