import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuppliersListComponent } from './pages/suppliers-list/suppliers-list.component';
import { SuppliersAddComponent } from './pages/suppliers-add/suppliers-add.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            children: [
                { path: 'suppliers-list', component: SuppliersListComponent },
                { path: 'suppliers-add', component: SuppliersAddComponent, },
                { path: '', pathMatch: 'full', redirectTo: 'suppliers-list' },
            ],
        },
    ])],
    exports: [RouterModule]
})
export class SuppliersRoutingModule { }
