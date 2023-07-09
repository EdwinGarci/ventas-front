import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { createUser, createUserInstance } from '../../state/actions/users.actions';
import { CreateUserDto } from '../../dto';
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoleService } from '../../../roles/services/role.service';
import { Role } from "../../../roles/models/role.model";
import { AppState as RoleState } from '../../../roles/state/reducers/roles.reducers';
import { selectRoles } from '../../../roles/state/selectors/roles.selectors';
import { selectUserCreateState } from '../../state/selectors/users.selectors';
import { AppState } from '../../state/reducers/users.reducers';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class UsersAddComponent implements OnInit {

  userForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  creating$: boolean;
  error$: any;
  roles: Role[];

  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    public userService: UserService,
    private store: Store<AppState>,
    private storeRol: Store<RoleState>,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public rolesService: RoleService,
    public ref: DynamicDialogRef,
  ) {
    this.userForm = this.fb.group({
      name:            ["", [Validators.required, Validators.minLength(3), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      lastname:        ["", [Validators.required, Validators.minLength(7), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      dni:             ["", [Validators.required]],
      username:        ["", [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      email:           ["", [Validators.required, Validators.email]],
      password:        ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      role:            ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.store.select(selectUserCreateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.creating$ = loading;

      if (done) {
        this.userForm.reset();
        this.ref.close();
      }
    });

    this.storeRol.select(selectRoles).subscribe((roles) => {
      this.roles = roles;
    });

  }

  onSubmit() {
    const user: CreateUserDto = {
      name    : this.userForm.value.name,
      lastname: this.userForm.value.lastname,
      dni     : this.userForm.value.dni,
      username: this.userForm.value.username,
      email   : this.userForm.value.email,
      password: this.userForm.value.password,
      role    : this.userForm.value.roles,
    };
    this.store.dispatch(createUser({ usuario: user }));
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
    this.userForm.reset();
  }

}
