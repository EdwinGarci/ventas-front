import { createAction, props } from '@ngrx/store';
import { CreateServiceDto } from '../../dto/create-service.dto';
import { UpdateServiceDto } from '../../dto/update-service.dto';
import { Service } from '../../models/service.model';

// [**LOAD Actions**]

export const loadServices = createAction(
    '[Services] Load list of services',
);

export const loadedServices = createAction(
    '[Services] Loaded success',
    props<{ services: Service[] }>()
)

export const servicesNotFound = createAction(
    '[Services] Load services not found results',
    props<{ error: any }>()
);

// [**CREATE Actions**]

export const createServiceInstance = createAction(
    '[Sales] Create instance'
);

export const createService = createAction(
    '[Services] Create new service',
    props<{ service: CreateServiceDto }>()
);

export const createdService = createAction(
    '[Services] Created service success',
    props<{ newService: Service }>()
)

export const createServiceFailure = createAction(
    '[Services] Create service failure',
    props<{ error: any }>()
);

// [**DELETE Actions**]

export const deleteInstance = createAction(
    '[Services] Delete instance'
);

export const deleteService = createAction(
    '[Services] Delete service',
    props<{ id: number }>()
);

export const deletedService = createAction(
    '[Services] Deleted service success',
    props<{ id: number }>()
);

export const deletedServiceFailure = createAction(
    '[Services] Deleted service failure',
    props<{ error: any }>()
);

// [**UPDATE Actions**]

export const updateServiceInstance = createAction(
    '[Sales] Update service instance'
);

export const updateService = createAction(
    '[Services] Update service',
    props<{ service: UpdateServiceDto }>()
);

export const updatedService = createAction(
    '[Services] Updated service success',
    props<{ service: Service }>()
)

export const updateServiceFailure = createAction(
    '[Services] Update service failure',
    props<{ error: any }>()
);

export const openModal = createAction(
    '[Services] Open Edit Modal',
    props<{ service: Service }>()
);

export const closeModal = createAction(
    '[Services] Close Edit Modal'
);