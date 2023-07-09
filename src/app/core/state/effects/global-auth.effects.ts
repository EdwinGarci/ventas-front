import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { mergeMap, catchError, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as authActions from '../actions/global-auth.actions';
import { AuthService } from "../../../core/service/auth.service";

@Injectable()
export class GlobalAuthEffects {

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.logout),
        tap(action => {
            this.authService.logout();
        })
    )
        , { dispatch: false });

    login$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.login),
        mergeMap((params) => this.authService.login(params.dto)
            .pipe(
                mergeMap(user => [
                    authActions.loggedIn({ user }),
                ]),
                catchError((response) => {
                    return of(authActions.loggedInFailure({ error: response }))
                }
                )
            ))
    )
    );


    constructor(
        private actions$: Actions,
        private authService: AuthService,
    ) { }
}