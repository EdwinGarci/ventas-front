// import { Injectable } from "@angular/core";
// import { catchError, mergeMap } from 'rxjs/operators';
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import * as authActions from './global-admin.actions';
// import { Router } from '@angular/router';
// import { of } from "rxjs";
// import { RoleService } from "../components/roles/services/role.service";


// @Injectable()
// export class GlobalAdminEffects {
//     loadRoles$ = createEffect(() => this.actions$.pipe(
//         ofType(authActions.loadRoles),
//         mergeMap(() => this.roleService.getRoles()
//             .pipe(
//                 mergeMap(roles => [
//                     authActions.loadedRoles({ roles }),
//                 ])
//             ))
//     )
//     );

//     constructor(
//         private actions$: Actions,
//         private roleService: RoleService,
//         public router: Router
//     ) { }
// }