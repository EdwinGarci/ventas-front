import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { emitAlert } from '../../../../../core/state/actions/ui.actions';
import { UserService } from '../../services/user.service';
import * as usersActions from '../actions/users.actions';



@Injectable()
export class UsersEffects {

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(usersActions.loadUsers),
        mergeMap(() => this.usersService.getUserss()
            .pipe(
                mergeMap(users => [
                    usersActions.loadedUsers({ usuarios: users }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(usersActions.usersNotFound({ error: response }))
                }
                )
            ))
    )
    );

    createUser$ = createEffect(() => this.actions$.pipe(
        ofType(usersActions.createUser),
        mergeMap((params) => this.usersService.saveUser(params.usuario)
            .pipe(
                mergeMap(user => [
                    usersActions.createdUser({ newUsuario: user }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(usersActions.createUserFailure({ error: response }))
                })
            ))
    )
    );

    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(usersActions.deleteUser),
        mergeMap((params) => this.usersService.deleteUser(params.id)
            .pipe(
                mergeMap(response => [
                    usersActions.deletedUser({ id: params.id }),
                    emitAlert({ alert: { tittle: "Correcto", message: "Eliminado correctamente", type: "success" } })
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(emitAlert({ alert: { tittle: "Error", message: "Algo salio mal", type: "error" } }),
                        usersActions.deletedUserFailure({ error: { errors: response, action: "delete" } })
                    )
                })
            ))
    )
    );

    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(usersActions.updateUser),
        mergeMap((params) => this.usersService.updateUser(params.usuario)
            .pipe(
                mergeMap(user => [
                    usersActions.updatedUser({ usuario: user }),
                    emitAlert({ alert: { tittle: "Correcto", message: "Actualizado correctamente", type: "success" } }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(usersActions.updateUserFailure({ error: response }))
                })
            ))
    )
    );

    // createUser$ = createEffect(() => this.actions$.pipe(
    //     ofType(usersActions.createUser),
    //     mergeMap((params) => this.usersService.saveUser(params.usuario)
    //         .pipe(
    //             map(user => usersActions.createdUser({ newUsuario: user })),
    //             catchError((error: HttpErrorResponse) => {
    //                 return of(usersActions.createUserFailure({ error: error.error.message }))
    //             })
    //         ))
    // )
    // );

    constructor(
        private actions$: Actions,
        private usersService: UserService,
        public router: Router
    ) { }
}