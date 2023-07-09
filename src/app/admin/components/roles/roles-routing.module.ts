import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolesListComponent } from './pages/roles-list/roles-list.component';
import { RolesAddComponent } from './pages/roles-add/roles-add.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            children: [
                { path: 'roles-list', component: RolesListComponent },
                // { path: 'roles-add', component: RolesAddComponent, },
                { path: '', pathMatch: 'full', redirectTo: 'roles-list' },
            ],
        },
    ])],
    exports: [RouterModule]
})
export class RolesRoutingModule { }
