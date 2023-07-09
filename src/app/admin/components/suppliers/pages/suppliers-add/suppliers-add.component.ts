import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { AppState } from '../../state/reducers/suppliers.reducers';
import { Store } from '@ngrx/store';
import { SupplierService } from '../../services/supplier.service';
import { CreateSupplierDto } from '../../dto';
import { selectSupplierCreateState } from '../../state/selectors/suppliers.selectors';
import { createSupplier } from '../../state/actions/suppliers.actions';

@Component({
  selector: 'app-suppliers-add',
  templateUrl: './suppliers-add.component.html',
  styleUrls: ['./suppliers-add.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class SuppliersAddComponent implements OnInit {

  supplierForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  creating$: boolean;
  error$: any;

  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public suppliersService: SupplierService,
    public ref: DynamicDialogRef,
  ) {
    this.supplierForm = this.fb.group({
      name        : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      ruc         : ["", [Validators.required, Validators.maxLength(11), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      address     : ["", [Validators.required, Validators.minLength(7), Validators.maxLength(60), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      phone       : ["", [Validators.required, Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      email       : ["", [Validators.required, Validators.email]],
      type_product: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(200), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
    });
  }

  ngOnInit() {
    this.store.select(selectSupplierCreateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.creating$ = loading;

      if (done) {
        this.supplierForm.reset();
        this.ref.close();
      }
    })
  }

  onSubmit() {
    const supplier: CreateSupplierDto = {
      name        : this.supplierForm.value.name,
      ruc         : this.supplierForm.value.lastname,
      address     : this.supplierForm.value.address,
      phone       : this.supplierForm.value.phone,
      email       : this.supplierForm.value.email,
      type_product: this.supplierForm.value.type_product,
    };
    this.store.dispatch(createSupplier({ supplier: supplier }));
  }

  ngOnDestroy(): void {
    this._onDestroy.next;
    this._onDestroy.complete();
  }

  onNoClick(): void {
    this.ref.close();
  }

  closeDialog() {
    this.ref.close();
    this.supplierForm.reset();
  }

}
