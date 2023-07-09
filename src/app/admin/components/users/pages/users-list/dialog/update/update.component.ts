import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '../../../../models/user.model';
import { Subject } from 'rxjs';
import { AppState } from '../../../../state/reducers/users.reducers';
import { Store } from '@ngrx/store';
import { UserService } from '../../../../services/user.service';
import { updateUser, updateUserInstance } from '../../../../state/actions/users.actions';
import { selectUserUpdateState } from '../../../../state/selectors/users.selectors';
import { UpdateUserDto } from '../../../../dto';
import { Role } from 'src/app/admin/components/roles/models/role.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class UpdateComponent implements OnInit {

  @ViewChild('formDirective') formDirective: FormGroupDirective

  userForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  updating$: boolean;
  error$: any;
  user: User;
  action: string;
  id: string;
  roles: Role[];

  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public usersService: UserService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.store.dispatch(updateUserInstance());
  }

  ngOnInit() {
    const dialogData = this.config.data;
    this.user = dialogData.user;
    this.action = dialogData.action;
    this.id = dialogData.id;

    this.userForm = this.fb.group({
      uuid    : [this.user.uuid, [Validators.required]],
      name    : [this.user.name, [Validators.required, Validators.minLength(3), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      lastname: [this.user.lastname, [Validators.required, Validators.minLength(7), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      dni     : [this.user.dni, [Validators.required]],
      username: [this.user.username, [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      email   : [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      role    : [this.user.role, [Validators.required]],
    });

    this.store.select(selectUserUpdateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.updating$ = loading;

      if (done) {
        this.userForm.reset();
        this.ref.close();
      }
    });
  }

  onSubmit() {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const user: UpdateUserDto = {
      uuid    : this.userForm.value.uuid,
      name    : this.userForm.value.name,
      lastname: this.userForm.value.lastname,
      dni     : this.userForm.value.dni,
      username: this.userForm.value.username,
      email   : this.userForm.value.email,
      password: this.userForm.value.password,
      id_role : this.userForm.value.role,
      // uuid_user: currentUser.user.uuid,
    }
    this.store.dispatch(updateUser({ usuario: user }));
  }

  ngOnDestroy(): void {
    this._onDestroy.next;
    this._onDestroy.complete();
  }

  closeDialog() {
    this.ref.close();
  }

}
