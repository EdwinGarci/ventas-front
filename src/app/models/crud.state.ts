export class CRUDState {
    constructor(
        public errors: any | null,
        public loading: boolean,
        public done: boolean | null,
    ) { }
}