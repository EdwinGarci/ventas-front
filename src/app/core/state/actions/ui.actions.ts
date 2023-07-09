import { createAction, props } from '@ngrx/store';
import { Alert } from '../../../models/utils/alert'

export const isLoading = createAction('[UI] Is Loading');
export const stopLoading = createAction('[UI] Stop Loading');
export const emitAlert = createAction('[UI] Emit alert',
    props<{ alert: Alert }>()
);