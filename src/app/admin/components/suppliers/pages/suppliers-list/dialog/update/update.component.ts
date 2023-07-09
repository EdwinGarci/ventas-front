import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Supplier } from '../../../../models/supplier.model';
import { Subject } from 'rxjs';
import { AppState } from '../../../../state/reducers/suppliers.reducers';
import { Store } from '@ngrx/store';
import { SupplierService } from '../../../../services/supplier.service';
import { updateSupplier, updateSupplierInstance } from '../../../../state/actions/suppliers.actions';
import { selectSupplierUpdateState } from '../../../../state/selectors/suppliers.selectors';
import { UpdateSupplierDto } from '../../../../dto';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class UpdateComponent implements OnInit {

  @ViewChild('formDirective') formDirective: FormGroupDirective

  supplierForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  updating$: boolean;
  error$: any;
  supplier: Supplier;
  action: string;
  id: string;

  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public suppliersService: SupplierService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.store.dispatch(updateSupplierInstance());
  }

  ngOnInit() {
    const dialogData = this.config.data;
    this.supplier = dialogData.supplier;
    this.action = dialogData.action;
    this.id = dialogData.id;

    this.supplierForm = this.fb.group({
      id          : [this.supplier.id, [Validators.required]],
      name        : [this.supplier.name, [Validators.required, Validators.minLength(3), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      ruc         : [this.supplier.ruc, [Validators.required, Validators.maxLength(11), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      address     : [this.supplier.address, [Validators.required, Validators.minLength(7), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      phone       : [this.supplier.phone, [Validators.required, Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]],
      email       : [this.supplier.email, [Validators.required, Validators.email]],
      type_product: [this.supplier.type_product, [Validators.required, Validators.minLength(7), Validators.pattern("^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ,;.0-9\u00F1ñ -]+$")]]
    });

    this.store.select(selectSupplierUpdateState).subscribe(({ errors, loading, done }) => {
      this.error$ = errors != null ? errors : null;
      this.updating$ = loading;

      if (done) {
        this.supplierForm.reset();
        this.ref.close();
      }
    });
  }

  onSubmit() {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const supplier: UpdateSupplierDto = {
      id          : this.supplierForm.value.id,
      name        : this.supplierForm.value.name,
      ruc         : this.supplierForm.value.ruc,
      address     : this.supplierForm.value.dni,
      phone       : this.supplierForm.value.username,
      email       : this.supplierForm.value.email,
      type_product: this.supplierForm.value.type_product
      // uuid_user: currentUser.user.uuid,
    }
    this.store.dispatch(updateSupplier({ supplier: supplier }));
  }

  ngOnDestroy(): void {
    this._onDestroy.next;
    this._onDestroy.complete();
  }

  closeDialog() {
    this.ref.close();
  }

}
