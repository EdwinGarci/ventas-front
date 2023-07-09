import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Client } from '../../../../models/client.model';
import { Subject } from 'rxjs';
import { AppState } from '../../../../state/reducers/clients.reducers';
import { Store } from '@ngrx/store';
import { ClientService } from '../../../../services/client.service';
import { updateClient, updateClientInstance } from '../../../../state/actions/clients.actions';
import { selectClientUpdateState } from '../../../../state/selectors/clients.selectors';
import { UpdateClientDto } from '../../../../dto';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class UpdateComponent implements OnInit {

  @ViewChild('formDirective') formDirective: FormGroupDirective

  clientForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  updating$: boolean;
  error$: any;
  client: Client;
  action: string;
  id: string;

  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public clientsService: ClientService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.store.dispatch(updateClientInstance());
  }

  ngOnInit() {
    const dialogData = this.config.data;
    this.client = dialogData.client;
    this.action = dialogData.action;
    this.id = dialogData.id;

    this.clientForm = this.fb.group({
      id      : [this.client.id, [Validators.required]],
      name    : [this.client.name, [Validators.required, Validators.minLength(3), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      lastname: [this.client.lastname, [Validators.required, Validators.minLength(7), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      address:  [this.client.address, [Validators.required, Validators.minLength(7), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      phone:    [this.client.phone, [Validators.required, Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      email:    [this.client.email, [Validators.required, Validators.email]],
    });

    this.store.select(selectClientUpdateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.updating$ = loading;

      if (done) {
        this.clientForm.reset();
        this.ref.close();
      }
    });
  }

  onSubmit() {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const client: UpdateClientDto = {
      id      : this.clientForm.value.id,
      name    : this.clientForm.value.name,
      lastname: this.clientForm.value.lastname,
      address : this.clientForm.value.dni,
      phone   : this.clientForm.value.username,
      email   : this.clientForm.value.email,
      // uuid_user: currentUser.user.uuid,
    }
    this.store.dispatch(updateClient({ cliente: client }));
  }

  ngOnDestroy(): void {
    this._onDestroy.next;
    this._onDestroy.complete();
  }

  closeDialog() {
    this.ref.close();
  }

}
