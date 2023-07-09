import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
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
import { MessagesModule } from 'primeng/messages';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { clientsReducer } from './state/reducers/clients.reducers';
import { ClientsEffects } from './state/effects/clients.effects';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientsAddComponent } from './pages/clients-add/clients-add.component';
import { UpdateComponent } from './pages/clients-list/dialog/update/update.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
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
    StoreModule.forFeature('clientes', clientsReducer),
    // StoreModule.forFeature('roles', rolesReducer),
    EffectsModule.forFeature([ClientsEffects]),
  ],
  declarations: [
    ClientsListComponent,
    ClientsAddComponent,
    UpdateComponent
  ]
})
export class ClientsModule { }
