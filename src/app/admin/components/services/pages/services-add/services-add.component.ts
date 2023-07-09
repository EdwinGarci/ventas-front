import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { AppState } from '../../state/reducers/services.reducers';
import { Store } from '@ngrx/store';
import { ServiceService } from '../../services/service.service';
import { selectServiceCreateState } from '../../state/selectors/services.selectors';
import { CreateServiceDto } from '../../dto';
import { createService } from '../../state/actions/services.actions';

@Component({
  selector: 'app-services-add',
  templateUrl: './services-add.component.html',
  styleUrls: ['./services-add.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class ServicesAddComponent implements OnInit {

  serviceForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  creating$: boolean;
  error$: any;

  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public servicesService: ServiceService,
    public ref: DynamicDialogRef,
  ) {
    this.serviceForm = this.fb.group({
      name              : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      description       : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(200), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      service_price     : ["", [Validators.required, Validators.max(999999999), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      estimated_duration: ["", [Validators.required, Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      availability      : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      category          : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
    });
  }

  ngOnInit() {
    this.store.select(selectServiceCreateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.creating$ = loading;

      if (done) {
        this.serviceForm.reset();
        this.ref.close();
      }
    })
  }

  onSubmit() {
    const service: CreateServiceDto = {
      name              : this.serviceForm.value.name,
      description       : this.serviceForm.value.description,
      service_price     : this.serviceForm.value.service_price,
      estimated_duration: this.serviceForm.value.estimated_duration,
      availability      : this.serviceForm.value.availability,
      category          : this.serviceForm.value.category,
    };
    this.store.dispatch(createService({ service: service }));
  }

  ngOnDestroy(): void {
    this._onDestroy.next;
    this._onDestroy.complete();
  }

  onNoClick(): void {
    this.ref.close();
  }

  closeDialog() {
    this.ref.close();
    this.serviceForm.reset();
  }

}
