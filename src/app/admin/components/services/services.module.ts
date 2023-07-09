import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ServicesEffects } from './state/effects/services.effects';
import { servicesReducer } from './state/reducers/services.reducers';
import { ServicesRoutingModule } from './services-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ServicesAddComponent } from './pages/services-add/services-add.component';
import { ServicesListComponent } from './pages/services-list/services-list.component';
import { UpdateComponent } from './pages/services-list/dialog/update/update.component';

@NgModule({
  imports: [
    CommonModule,
    ServicesRoutingModule,
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
    StoreModule.forFeature('services', servicesReducer),
    EffectsModule.forFeature([ServicesEffects]),
  ],
  declarations: [
    UpdateComponent,
    ServicesListComponent,
    ServicesAddComponent
  ]
})
export class ServicesModule { }
