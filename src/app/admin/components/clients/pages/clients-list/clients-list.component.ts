import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Client } from '../../models/client.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers/clients.reducers';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../services/client.service';
import { createClientInstance, deleteClient, deleteInstance, loadClients, updateClientInstance } from '../../state/actions/clients.actions';
import { ClientsAddComponent } from '../clients-add/clients-add.component';
import { Table } from 'primeng/table';
import { UpdateComponent } from './dialog/update/update.component';
import { selectClientCreateState, selectClientDeleteState, selectClientLoadState, selectClientUpdateState, selectClients } from '../../state/selectors/clients.selectors';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class ClientsListComponent implements OnInit {

  displayedColumns = [
    "#",
    "Nombres",
    "Apellidos",
    "Dirección",
    "Teléfono",
    "Correo electrónico",
    "Acciones",
  ];

  dataSource: Client[] | null;
  selection = new SelectionModel<Client>(true, []);
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
    public clientService: ClientService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
  ) { 
    this.store.dispatch(loadClients());
  }

  ngOnInit() {
    this.store.select(selectClientLoadState).subscribe(({ errors, loading }) => {
      this.errorLoad$ = errors != null ? "No hay datos para mostrar" : null;
      this.loading$ = loading;
    });

    this.store.select(selectClientDeleteState).subscribe(({ errors, loading, done }) => {

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

    this.store.select(selectClientCreateState).subscribe(({ errors, loading, done }) => {
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
        this.store.dispatch(createClientInstance());
      }
    })

    this.store.select(selectClientUpdateState).subscribe(({ errors, loading, done }) => {
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
        this.store.dispatch(updateClientInstance());
      }
    });

    this.store.select(selectClients).subscribe((clients) => {
      this.dataSource = clients;
    });
  }

  onEdit(client: Client) {
    this.ref = this.dialogService.open(UpdateComponent, {
      data: {
        client,
        action: 'edit',
        id: '51gF3',
      },
      header: 'Editar un cliente',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  openNew(){
    this.ref = this.dialogService.open(ClientsAddComponent, {
      header: 'Agregar Cliente',
      width: '30%',
    });
  }

  deleteItem(event: Event, client: Client) {
    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target,
      message: 'Esta seguro de eliminar este campo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteClient({ id: client.id }));},
      reject: () => {
      }
    });
  }

  removeSelectedRows() {
    this.selection.selected.forEach((item) => {
      this.store.dispatch(deleteClient({ id: item.id }));
      this.selection = new SelectionModel<Client>(true, []);
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
