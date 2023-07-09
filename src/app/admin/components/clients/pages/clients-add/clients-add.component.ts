import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppState } from '../../state/reducers/clients.reducers';
import { ClientService } from '../../services/client.service';
import { selectClientCreateState } from '../../state/selectors/clients.selectors';
import { createClient, createClientInstance } from '../../state/actions/clients.actions';
import { CreateClientDto } from '../../dto';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class ClientsAddComponent implements OnInit {

  clientForm: UntypedFormGroup;
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
    public clientsService: ClientService,
    public ref: DynamicDialogRef,
  ) {
    this.clientForm = this.fb.group({
      name:     ["", [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      lastname: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      address:  ["", [Validators.required, Validators.minLength(7), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      phone:    ["", [Validators.required, Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      email:    ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.store.select(selectClientCreateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.creating$ = loading;

      if (done) {
        this.clientForm.reset();
        this.ref.close();
      }
    })
  }

  onSubmit() {
    const client: CreateClientDto = {
      name: this.clientForm.value.name,
      lastname: this.clientForm.value.lastname,
      address: this.clientForm.value.address,
      phone: this.clientForm.value.phone,
      email: this.clientForm.value.email,
    };
    this.store.dispatch(createClient({ cliente: client }));
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
    this.clientForm.reset();
  }

}
