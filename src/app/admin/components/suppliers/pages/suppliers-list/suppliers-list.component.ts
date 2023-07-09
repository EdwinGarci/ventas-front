import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Supplier } from '../../models/supplier.model';
import { SelectionModel } from '@angular/cdk/collections';
import { AppState } from '../../state/reducers/suppliers.reducers';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { SupplierService } from '../../services/supplier.service';
import { createSupplierInstance, deleteInstance, deleteSupplier, loadSuppliers, updateSupplierInstance } from '../../state/actions/suppliers.actions';
import { UpdateComponent } from './dialog/update/update.component';
import { SuppliersAddComponent } from '../suppliers-add/suppliers-add.component';
import { Table } from 'primeng/table';
import { selectSupplierCreateState, selectSupplierDeleteState, selectSupplierLoadState, selectSupplierUpdateState, selectSuppliers } from '../../state/selectors/suppliers.selectors';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class SuppliersListComponent implements OnInit {

  displayedColumns = [
    "#",
    "Nombre",
    "RUC",
    "Dirección",
    "Teléfono",
    "Correo electrónico",
    "Tipo de Producto",
    "Acciones",
  ];

  dataSource: Supplier[] | null;
  selection = new SelectionModel<Supplier>(true, []);
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
    public supplierService: SupplierService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
  ) { 
    this.store.dispatch(loadSuppliers());
  }

  ngOnInit() {
    this.store.select(selectSupplierLoadState).subscribe(({ errors, loading }) => {
      this.errorLoad$ = errors != null ? "No hay datos para mostrar" : null;
      this.loading$ = loading;
    });

    this.store.select(selectSupplierDeleteState).subscribe(({ errors, loading, done }) => {

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

    this.store.select(selectSupplierCreateState).subscribe(({ errors, loading, done }) => {
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
        this.store.dispatch(createSupplierInstance());
      }
    })

    this.store.select(selectSupplierUpdateState).subscribe(({ errors, loading, done }) => {
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
        this.store.dispatch(updateSupplierInstance());
      }
    });

    this.store.select(selectSuppliers).subscribe((suppliers) => {
      this.dataSource = suppliers;
    });
  }

  onEdit(supplier: Supplier) {
    this.ref = this.dialogService.open(UpdateComponent, {
      data: {
        supplier,
        action: 'edit',
        id: '51gF3',
      },
      header: 'Editar un proveedor',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  openNew(){
    this.ref = this.dialogService.open(SuppliersAddComponent, {
      header: 'Agregar Proveedor',
      width: '30%',
    });
  }

  deleteItem(event: Event, supplier: Supplier) {
    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target,
      message: 'Esta seguro de eliminar este campo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteSupplier({ id: supplier.id }));},
      reject: () => {
      }
    });
  }

  removeSelectedRows() {
    this.selection.selected.forEach((item) => {
      this.store.dispatch(deleteSupplier({ id: item.id }));
      this.selection = new SelectionModel<Supplier>(true, []);
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
