import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoleService } from '../../../../services/role.service';
import { AppState } from '../../../../state/reducers/roles.reducers';
import { updateRole, updateRoleInstance } from '../../../../state/actions/roles.actions';
import { selectRoleUpdateState } from '../../../../state/selectors/roles.selectors';
import { Subject } from 'rxjs';
import { UpdateRoleDto } from '../../../../dto';
import { Role } from '../../../../models/role.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class UpdateComponent implements OnInit {

  @ViewChild('formDirective') formDirective: FormGroupDirective

  roleForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  updating$: boolean;
  error$: any;
  role: Role;
  action: string;
  id: string;

  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public rolesService: RoleService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.store.dispatch(updateRoleInstance());
  }

  ngOnInit() {
    const dialogData = this.config.data;
    this.role = dialogData.role;
    this.action = dialogData.action;
    this.id = dialogData.id;

    this.roleForm = this.fb.group({
      id         : [this.role.id, [Validators.required]],
      name       : [this.role.name, [Validators.required, Validators.minLength(3), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      description: [this.role.description, [Validators.required, Validators.minLength(3), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
    });

    this.store.select(selectRoleUpdateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.updating$ = loading;

      if (done) {
        this.roleForm.reset();
        this.ref.close();
      }
    });
  }

  onSubmit() {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const rol: UpdateRoleDto = {
      id: this.roleForm.value.id,
      name: this.roleForm.value.name,
      description: this.roleForm.value.description,
      // uuid_user: currentUser.user.uuid,
    }
    this.store.dispatch(updateRole({ rol: rol }));
  }

  ngOnDestroy(): void {
    this._onDestroy.next;
    this._onDestroy.complete();
  }

  closeDialog() {
    this.ref.close();
    // this.roleForm.reset();
  }

}
