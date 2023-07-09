import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RolesListComponent } from './pages/roles-list/roles-list.component';
import { RolesAddComponent } from './pages/roles-add/roles-add.component';
import { UpdateComponent } from './pages/roles-list/dialog/update/update.component';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToolbarModule } from 'primeng/toolbar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { rolesReducer } from './state/reducers/roles.reducers';
import { RolesEffects } from './state/effects/roles.effects';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
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
    InputTextareaModule,
    CardModule,
    StoreModule.forFeature('roles', rolesReducer),
    EffectsModule.forFeature([RolesEffects]),
  ],
  declarations: [
    RolesAddComponent,
    UpdateComponent,
    RolesListComponent
  ]
})
export class RolesModule { }
