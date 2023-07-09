import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesListComponent } from './pages/services-list/services-list.component';
import { ServicesAddComponent } from './pages/services-add/services-add.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            children: [
                { path: 'services-list', component: ServicesListComponent },
                { path: 'services-add', component: ServicesAddComponent, },
                { path: '', pathMatch: 'full', redirectTo: 'services-list' },
            ],
        },
    ])],
    exports: [RouterModule]
})
export class ServicesRoutingModule { }
