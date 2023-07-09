import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersRoutingModule } from './suppliers-routing.module';
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
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SuppliersEffects } from './state/effects/suppliers.effects';
import { suppliersReducer } from './state/reducers/suppliers.reducers';
import { SuppliersListComponent } from './pages/suppliers-list/suppliers-list.component';
import { SuppliersAddComponent } from './pages/suppliers-add/suppliers-add.component';
import { UpdateComponent } from './pages/suppliers-list/dialog/update/update.component';


@NgModule({
  imports: [
    CommonModule,
    SuppliersRoutingModule,
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
    StoreModule.forFeature('suppliers', suppliersReducer),
    EffectsModule.forFeature([SuppliersEffects]),
  ],
  declarations: [
    UpdateComponent,
    SuppliersListComponent,
    SuppliersAddComponent
  ]
})
export class SuppliersModule { }
