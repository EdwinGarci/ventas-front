import { createAction, props } from '@ngrx/store';
import { CreateClientDto } from '../../dto/create-client.dto';
import { UpdateClientDto } from '../../dto/update-client.dto';
import { Client } from '../../models/client.model';

// [**LOAD Actions**]

export const loadClients = createAction(
    '[Clients] Load list of clients',
);

export const loadedClients = createAction(
    '[Clients] Loaded success',
    props<{ clientes: Client[] }>()
)

export const clientsNotFound = createAction(
    '[Clients] Load clients not found results',
    props<{ error: any }>()
);

// [**CREATE Actions**]

export const createClientInstance = createAction(
    '[Sales] Create instance'
);

export const createClient = createAction(
    '[Clients] Create new client',
    props<{ cliente: CreateClientDto }>()
);

export const createdClient = createAction(
    '[Clients] Created client success',
    props<{ newCliente: Client }>()
)

export const createClientFailure = createAction(
    '[Clients] Create client failure',
    props<{ error: any }>()
);

// [**DELETE Actions**]

export const deleteInstance = createAction(
    '[Clients] Delete instance'
);

export const deleteClient = createAction(
    '[Clients] Delete client',
    props<{ id: number }>()
);

export const deletedClient = createAction(
    '[Clients] Deleted client success',
    props<{ id: number }>()
);

export const deletedClientFailure = createAction(
    '[Clients] Deleted client failure',
    props<{ error: any }>()
);

// [**UPDATE Actions**]

export const updateClientInstance = createAction(
    '[Sales] Update client instance'
);

export const updateClient = createAction(
    '[Clients] Update client',
    props<{ cliente: UpdateClientDto }>()
);

export const updatedClient = createAction(
    '[Clients] Updated client success',
    props<{ cliente: Client }>()
)

export const updateClientFailure = createAction(
    '[Clients] Update client failure',
    props<{ error: any }>()
);

export const openModal = createAction(
    '[Clients] Open Edit Modal',
    props<{ cliente: Client }>()
);

export const closeModal = createAction(
    '[Clients] Close Edit Modal'
);