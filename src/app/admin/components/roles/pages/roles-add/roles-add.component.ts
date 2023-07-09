import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppState } from '../../state/reducers/roles.reducers';
import { RoleService } from '../../services/role.service';
import { selectRoleCreateState } from '../../state/selectors/roles.selectors';
import { createRole, createRoleInstance } from '../../state/actions/roles.actions';
import { CreateRoleDto } from '../../dto';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-roles-add',
  templateUrl: './roles-add.component.html',
  styleUrls: ['./roles-add.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class RolesAddComponent implements OnInit {

  roleForm: UntypedFormGroup;
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
    public rolesService: RoleService,
    public ref: DynamicDialogRef,
  ) {
    this.roleForm = this.fb.group({
      name       : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      description: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
    });
  }

  ngOnInit() {
    this.store.select(selectRoleCreateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.creating$ = loading;

      if (done) {
        this.roleForm.reset();
        this.ref.close();
      }
    })
  }

  onSubmit() {
    const rol: CreateRoleDto = {
      name: this.roleForm.value.name,
      description: this.roleForm.value.description,
    };
    this.store.dispatch(createRole({ rol: rol }));
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
    this.roleForm.reset();
  }

}
