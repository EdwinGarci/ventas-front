import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SelectionModel } from "@angular/cdk/collections";
import { Store } from "@ngrx/store";

import { AppState } from "../../state/reducers/users.reducers";
import { selectUserCreateState, selectUserDeleteState, selectUserLoadState, selectUserUpdateState, selectUsers } from "../../state/selectors/users.selectors";
import { deleteInstance, loadUsers, deleteUser, createUserInstance, updateUserInstance } from '../../state/actions/users.actions';

import { UpdateComponent } from "./dialog/update/update.component";

import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { Table } from "primeng/table";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersAddComponent } from "../users-add/users-add.component";
import { loadRoles } from "../../../roles/state/actions/roles.actions";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class UsersListComponent implements OnInit {

  displayedColumns = [
    "#",
    "Nombres",
    "Apellidos",
    "Usuario",
    "Identificación",
    "Acciones",
  ];

  dataSource: User[] | null;
  selection = new SelectionModel<User>(true, []);
  deleting$: boolean;
  loading$: boolean;
  creating$: boolean;
  updating$: boolean;
  errorLoad$: any;
  error$: any;
  ref: DynamicDialogRef;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private store: Store<AppState>,
    public httpClient: HttpClient,
    public userService: UserService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
  ) {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadRoles());
  };

  ngOnInit() {
    this.store.select(selectUserLoadState).subscribe(({ errors, loading }) => {
      this.errorLoad$ = errors != null ? "No hay datos para mostrar" : null;
      this.loading$ = loading;
    })

    this.store.select(selectUserDeleteState).subscribe(({ errors, loading, done }) => {

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

    this.store.select(selectUserCreateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.creating$ = loading;

      if (done) {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto', 
          detail: 'Registrado Correctamente!'
        });
        setTimeout(() => {
          this.messageService.clear();
        }, 1000);
        this.store.dispatch(createUserInstance());
      }
    });

    this.store.select(selectUserUpdateState).subscribe(({ errors, loading, done }) => {
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
        this.store.dispatch(updateUserInstance());
      }
    });

    this.store.select(selectUsers).subscribe((users) => {
      this.dataSource = users;
    });
  }

  onEdit(user: User) {
    this.ref = this.dialogService.open(UpdateComponent, {
      data: {
        user,
        action: 'edit',
        id: '51gF3',
      },
      header: 'Editar un usuario',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  openNew(){
    this.ref = this.dialogService.open(UsersAddComponent, {
      header: 'Agregar Usuario',
      width: '30%',
    });
  }

  deleteItem(event: Event, user: User) {
    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target,
      message: 'Esta seguro de eliminar este campo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteUser({ id: user.uuid }));
      },
      reject: () => {
      }
    });
  }

  removeSelectedRows() {
    this.selection.selected.forEach((item) => {
      this.store.dispatch(deleteUser({ id: item.uuid }));
      this.selection = new SelectionModel<User>(true, []);
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  // lo de mas abajo es para exportar pdf, aun no se como se hace

  // exportPdf() {
  //   import('jspdf').then((jsPDF) => {
  //     import('jspdf-autotable').then((x) => {
  //       const doc = new jsPDF.default('p', 'px', 'a4');
  //       (doc as any).autoTable(this.exportColumns, this.products);
  //       doc.save('products.pdf');
  //     });
  //   });
  // }

  // exportExcel() {
  //   import('xlsx').then((xlsx) => {
  //     const worksheet = xlsx.utils.json_to_sheet(this.products);
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //     this.saveAsExcelFile(excelBuffer, 'products');
  //   });
  // }

}
