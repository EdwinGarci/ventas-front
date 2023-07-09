import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginDto } from 'src/app/core/dto/login.dto';
import { AuthService } from 'src/app/core/service/auth.service';
import { login, loginInstance } from 'src/app/core/state/actions/global-auth.actions';
import { AppState } from 'src/app/core/state/app.state';
import { selectLoginState } from 'src/app/core/state/selectors/global-auth.selector';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService, ConfirmationService, DialogService]
})
export class LoginComponent implements OnInit {

    @ViewChild('formDirective') formDirective: FormGroupDirective;

    authForm: FormGroup;

    loading = false;
    error: any;
    hide = true;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private store: Store<AppState>,
        private authService: AuthService,
        public layoutService: LayoutService,
        public router: Router,
        public ref: DynamicDialogRef,
        public dialogService: DialogService,
        public confirmationService: ConfirmationService,
        public messageService: MessageService,
    ) {
        if (this.authService.currentUserValue != null && window.location.pathname === '/') {
            this.router.navigate(['/admin/home']);
        }

        this.authForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
            password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        });
    }

    ngOnInit() {
        this.store.select(selectLoginState).subscribe(({ errors, loading, done }) => {
            this.error = errors != null ? errors : null;
            this.loading = loading;

            if (done) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Correcto',
                    detail: 'Inicio de sesión correcto'
                });
                setTimeout(() => {
                    this.messageService.clear();
                }, 1000);
                this.authForm.reset();
                this.store.dispatch(loginInstance());
                this.router.navigate(['/admin/home']);
            }
        });
    }

    onSubmit() {
        const dto: LoginDto = {
            username: this.authForm.value.username,
            password: this.authForm.value.password,
        };
        this.store.dispatch(login({ dto }));
    }
}
