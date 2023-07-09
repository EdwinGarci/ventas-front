import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { UpdateComponent } from './pages/users-list/dialog/update/update.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './state/reducers/users.reducers';
import { UsersEffects } from './state/effects/users.effects';
import { rolesReducer } from '../roles/state/reducers/roles.reducers';
import { RolesEffects } from '../roles/state/effects/roles.effects';
import { UsersAddComponent } from './pages/users-add/users-add.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    PasswordModule,
    ToolbarModule,
    CardModule,
    StoreModule.forFeature('usuarios', usersReducer),
    StoreModule.forFeature('roles', rolesReducer),
    EffectsModule.forFeature([UsersEffects, RolesEffects]),
  ],
  declarations: [
    UpdateComponent,
    UsersListComponent,
    UsersAddComponent
  ],
})
export class UsersModule { }
