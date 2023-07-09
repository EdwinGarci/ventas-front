import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { Global } from '../../../../config/global_url';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  public url: string;
  public headers: HttpHeaders;

  constructor(private _http: HttpClient,) {
    this.url = Global.url;
  }

  getSuppliers(): Observable<any> {
    return this._http.get(this.url + 'supplier', { headers: this.headers }).pipe(delay(1000));
  }

  getSupplier(id: number): Observable<any> {
    return this._http.get(this.url + 'supplier/' + id, { headers: this.headers }).pipe(delay(1000));
  }

  saveSupplier(dto: CreateSupplierDto): Observable<any> {
    return this._http.post(this.url + 'supplier', dto).pipe(delay(1000));
  }

  deleteSupplier(id: any): Observable<any> {
    return this._http.delete(this.url + 'supplier/' + id, { headers: this.headers }).pipe(delay(1000));
  }

  updateSupplier(dto: UpdateSupplierDto): Observable<any> {
    return this._http.patch(this.url + 'supplier', dto, { headers: this.headers }).pipe(delay(1000));
  }

}
