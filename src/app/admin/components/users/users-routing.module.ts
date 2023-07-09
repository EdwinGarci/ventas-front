import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UsersAddComponent } from './pages/users-add/users-add.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            children: [
                { path: 'users-list', component: UsersListComponent },
                { path: 'users-add', component: UsersAddComponent, },
                { path: '', pathMatch: 'full', redirectTo: 'users-list' },
            ],
        },
    ])],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
