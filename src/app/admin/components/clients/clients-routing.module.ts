import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            children: [
                { path: 'clients-list', component: ClientsListComponent },
                { path: '', pathMatch: 'full', redirectTo: 'clients-list' },
            ],
        },
    ])],
    exports: [RouterModule]
})
export class ClientsRoutingModule { }