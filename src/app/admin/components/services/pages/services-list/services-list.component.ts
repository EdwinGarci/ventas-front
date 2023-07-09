import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Service } from '../../models/service.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers/services.reducers';
import { HttpClient } from '@angular/common/http';
import { selectServiceCreateState, selectServiceDeleteState, selectServiceLoadState, selectServiceUpdateState, selectServices } from '../../state/selectors/services.selectors';
import { UpdateComponent } from './dialog/update/update.component';
import { createServiceInstance, deleteInstance, deleteService, loadServices, updateServiceInstance } from '../../state/actions/services.actions';
import { ServiceService } from '../../services/service.service';
import { ServicesAddComponent } from '../services-add/services-add.component';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class ServicesListComponent implements OnInit {

  displayedColumns = [
    "#",
    "Nombre",
    "Descripción",
    "Precio del Servicio",
    "Duración estimada",
    "Disponibilidad",
    "Categoría",
    "Acciones",
  ];

  dataSource: Service[] | null;
  selection = new SelectionModel<Service>(true, []);
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
    public serviceService: ServiceService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
  ) { 
    this.store.dispatch(loadServices());
  }

  ngOnInit() {
    this.store.select(selectServiceLoadState).subscribe(({ errors, loading }) => {
      this.errorLoad$ = errors != null ? "No hay datos para mostrar" : null;
      this.loading$ = loading;
    });

    this.store.select(selectServiceDeleteState).subscribe(({ errors, loading, done }) => {

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

    this.store.select(selectServiceCreateState).subscribe(({ errors, loading, done }) => {
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
        this.store.dispatch(createServiceInstance());
      }
    })

    this.store.select(selectServiceUpdateState).subscribe(({ errors, loading, done }) => {
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
        this.store.dispatch(updateServiceInstance());
      }
    });

    this.store.select(selectServices).subscribe((services) => {
      this.dataSource = services;
    });
  }

  onEdit(service: Service) {
    this.ref = this.dialogService.open(UpdateComponent, {
      data: {
        service,
        action: 'edit',
        id: '51gF3',
      },
      header: 'Editar un Servicio',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  openNew(){
    this.ref = this.dialogService.open(ServicesAddComponent, {
      header: 'Agregar Servicio',
      width: '30%',
    });
  }

  deleteItem(event: Event, service: Service) {
    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target,
      message: 'Esta seguro de eliminar este campo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteService({ id: service.id }));},
      reject: () => {
      }
    });
  }

  removeSelectedRows() {
    this.selection.selected.forEach((item) => {
      this.store.dispatch(deleteService({ id: item.id }));
      this.selection = new SelectionModel<Service>(true, []);
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
