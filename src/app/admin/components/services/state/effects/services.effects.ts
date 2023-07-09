import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { emitAlert } from '../../../../../core/state/actions/ui.actions';
import { ServiceService } from '../../services/service.service';
import * as servicesActions from '../actions/services.actions';

@Injectable()
export class ServicesEffects {

    loadServices$ = createEffect(() => this.actions$.pipe(
        ofType(servicesActions.loadServices),
        mergeMap(() => this.servicesService.getServices()
            .pipe(
                mergeMap(services => [
                    servicesActions.loadedServices({ services: services }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(servicesActions.servicesNotFound({ error: response }))
                }
                )
            ))
    )
    );

    createService$ = createEffect(() => this.actions$.pipe(
        ofType(servicesActions.createService),
        mergeMap((params) => this.servicesService.saveService(params.service)
            .pipe(
                mergeMap(service => [
                    servicesActions.createdService({ newService: service }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(servicesActions.createServiceFailure({ error: response }))
                })
            ))
    )
    );

    deleteService$ = createEffect(() => this.actions$.pipe(
        ofType(servicesActions.deleteService),
        mergeMap((params) => this.servicesService.deleteService(params.id)
            .pipe(
                mergeMap(response => [
                    servicesActions.deletedService({ id: params.id }),
                    emitAlert({ alert: { tittle: "Correcto", message: "Eliminado correctamente", type: "success" } })
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(emitAlert({ alert: { tittle: "Error", message: "Algo salio mal", type: "error" } }),
                        servicesActions.deletedServiceFailure({ error: { errors: response, action: "delete" } })
                    )
                })
            ))
    )
    );

    updateService$ = createEffect(() => this.actions$.pipe(
        ofType(servicesActions.updateService),
        mergeMap((params) => this.servicesService.updateService(params.service)
            .pipe(
                mergeMap(service => [
                    servicesActions.updatedService({ service: service }),
                    emitAlert({ alert: { tittle: "Correcto", message: "Actualizado correctamente", type: "success" } }),
                ]),
                catchError((response) => {
                    if (response == "Unauthorized") {
                        window.alert("Sesión expirada!");
                        localStorage.removeItem('access_token');
                        this.router.navigate([''])
                    }
                    return of(servicesActions.updateServiceFailure({ error: response }))
                })
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private servicesService: ServiceService,
        public router: Router
    ) { }
}