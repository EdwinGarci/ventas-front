import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { emitAlert } from '../../../../../core/state/actions/ui.actions';
import { ClientService } from '../../services/client.service';
import * as clientsActions from '../actions/clients.actions';

@Injectable()
export class ClientsEffects {

    loadClients$ = createEffect(() => this.actions$.pipe(
        ofType(clientsActions.loadClients),
        mergeMap(() => this.clientsService.getClients()
            .pipe(
                mergeMap(clients => [
                    clientsActions.loadedClients({ clientes: clients }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(clientsActions.clientsNotFound({ error: response }))
                }
                )
            ))
    )
    );

    createClient$ = createEffect(() => this.actions$.pipe(
        ofType(clientsActions.createClient),
        mergeMap((params) => this.clientsService.saveClient(params.cliente)
            .pipe(
                mergeMap(client => [
                    clientsActions.createdClient({ newCliente: client }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(clientsActions.createClientFailure({ error: response }))
                })
            ))
    )
    );

    deleteClient$ = createEffect(() => this.actions$.pipe(
        ofType(clientsActions.deleteClient),
        mergeMap((params) => this.clientsService.deleteClient(params.id)
            .pipe(
                mergeMap(response => [
                    clientsActions.deletedClient({ id: params.id }),
                    emitAlert({ alert: { tittle: "Correcto", message: "Eliminado correctamente", type: "success" } })
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(emitAlert({ alert: { tittle: "Error", message: "Algo salio mal", type: "error" } }),
                        clientsActions.deletedClientFailure({ error: { errors: response, action: "delete" } })
                    )
                })
            ))
    )
    );

    updateClient$ = createEffect(() => this.actions$.pipe(
        ofType(clientsActions.updateClient),
        mergeMap((params) => this.clientsService.updateClient(params.cliente)
            .pipe(
                mergeMap(client => [
                    clientsActions.updatedClient({ cliente: client }),
                    emitAlert({ alert: { tittle: "Correcto", message: "Actualizado correctamente", type: "success" } }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(clientsActions.updateClientFailure({ error: response }))
                })
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private clientsService: ClientService,
        public router: Router
    ) { }
}