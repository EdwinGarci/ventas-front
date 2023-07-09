import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Service } from '../../../../models/service.model';
import { Subject } from 'rxjs';
import { AppState } from '../../../../state/reducers/services.reducers';
import { Store } from '@ngrx/store';
import { ServiceService } from '../../../../services/service.service';
import { updateService, updateServiceInstance } from '../../../../state/actions/services.actions';
import { selectServiceUpdateState } from '../../../../state/selectors/services.selectors';
import { UpdateServiceDto } from '../../../../dto';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class UpdateComponent implements OnInit {

  @ViewChild('formDirective') formDirective: FormGroupDirective

  serviceForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  updating$: boolean;
  error$: any;
  service: Service;
  action: string;
  id: string;

  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public servicesService: ServiceService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.store.dispatch(updateServiceInstance());
  }

  ngOnInit() {
    const dialogData = this.config.data;
    this.service = dialogData.service;
    this.action = dialogData.action;
    this.id = dialogData.id;

    this.serviceForm = this.fb.group({
      id                : [this.service.id, [Validators.required]],
      name              : [this.service.name, [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      description       : [this.service.description, [Validators.required, Validators.minLength(3), Validators.maxLength(200), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      service_price     : [this.service.service_price, [Validators.required, Validators.max(999999999), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      estimated_duration: [this.service.estimated_duration, [Validators.required, Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      availability      : [this.service.availability, [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      category          : [this.service.category, [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
    });

    this.store.select(selectServiceUpdateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.updating$ = loading;

      if (done) {
        this.serviceForm.reset();
        this.ref.close();
      }
    });
  }

  onSubmit() {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const service: UpdateServiceDto = {
      id                : this.serviceForm.value.id,
      name              : this.serviceForm.value.name,
      description       : this.serviceForm.value.description,
      service_price     : this.serviceForm.value.service_price,
      estimated_duration: this.serviceForm.value.estimated_duration,
      availability      : this.serviceForm.value.availability,
      category          : this.serviceForm.value.category
      // uuid_user: currentUser.user.uuid,
    }
    this.store.dispatch(updateService({ service: service }));
  }

  ngOnDestroy(): void {
    this._onDestroy.next;
    this._onDestroy.complete();
  }

  closeDialog() {
    this.ref.close();
  }

}
