import { Alert } from "./utils/alert";

export interface UIState {
    isLoading: boolean;
    alert: Alert | null;
}