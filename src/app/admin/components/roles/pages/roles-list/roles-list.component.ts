import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Role } from '../../models/role.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { RoleService } from '../../services/role.service';
import { createRoleInstance, deleteInstance, deleteRole, loadRoles, updateRoleInstance } from '../../state/actions/roles.actions';
import { selectRoleCreateState, selectRoleDeleteState, selectRoleUpdateState, selectRoleLoadState, selectRoles } from '../../state/selectors/roles.selectors';
import { UpdateComponent } from './dialog/update/update.component';
import { Table } from 'primeng/table';
import { RolesAddComponent } from '../roles-add/roles-add.component';
import { AppState } from '../../state/reducers/roles.reducers';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class RolesListComponent implements OnInit {

  displayedColumns = [
    "#",
    "Nombres",
    "Descripción",
    "Acciones",
  ];

  dataSource: Role[] | null;
  selection = new SelectionModel<Role>(true, []);
  deleting$: boolean;
  loading$: boolean;
  creating$: boolean;
  updating$: boolean;
  errorLoad$: any;
  error$: any;
  ref: DynamicDialogRef;

  // showMessage: boolean = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private store: Store<AppState>,
    public httpClient: HttpClient,
    public roleService: RoleService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
  ) { 
    this.store.dispatch(loadRoles());
  }

  ngOnInit() {
    this.store.select(selectRoleLoadState).subscribe(({ errors, loading }) => {
      this.errorLoad$ = errors != null ? "No hay datos para mostrar" : null;
      this.loading$ = loading;
    });

    this.store.select(selectRoleDeleteState).subscribe(({ errors, loading, done }) => {

      this.deleting$ = loading;

      if (errors != null) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Algo salió mal'
        });
      }

      if (done) {
        this.messageService.add({ 
          severity: 'info', 
          summary: 'Correcto', 
          detail: 'Eliminado correctamente!' 
        });
        setTimeout(() => {
          this.messageService.clear();
        }, 1000);
        this.store.dispatch(deleteInstance());
      }
    });

    this.store.select(selectRoleCreateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.creating$ = loading;

      if (done) {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto', 
          detail: 'Creado Correctamente!',
        });
        setTimeout(() => {
          this.messageService.clear();
        }, 1000);
        this.store.dispatch(createRoleInstance());
      }
    });

    this.store.select(selectRoleUpdateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.updating$ = loading;

      if (done) {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto', 
          detail: 'Registro editado correctamente!'
        });
        setTimeout(() => {
          this.messageService.clear();
        }, 1000);
        this.store.dispatch(updateRoleInstance());
      }
    });

    this.store.select(selectRoles).subscribe((roles) => {
      this.dataSource = roles;
    });
  }

  onEdit(role: Role) {
    this.ref = this.dialogService.open(UpdateComponent, {
      data: {
        role,
        action: 'edit',
        id: '51gF3',
      },
      header: 'Editar un rol',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  openNew(){
    this.ref = this.dialogService.open(RolesAddComponent, {
      header: 'Agregar Rol',
      width: '30%',
    });
  }

  deleteItem(event: Event, role: Role) {
    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target,
      message: 'Esta seguro de eliminar este campo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteRole({ id: role.id }));
      },
      reject: () => {
      }
    });
  }

  removeSelectedRows() {
    this.selection.selected.forEach((item) => {
      this.store.dispatch(deleteRole({ id: item.id }));
      this.selection = new SelectionModel<Role>(true, []);
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

}
