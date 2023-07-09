import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CreateServiceDto } from '../dto/create-service.dto';
import { Global } from '../../../../config/global_url';
import { UpdateServiceDto } from '../dto/update-service.dto';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public url: string;
  public headers: HttpHeaders;

  constructor(private _http: HttpClient,) {
    this.url = Global.url;
  }

  getServices(): Observable<any> {
    return this._http.get(this.url + 'service', { headers: this.headers }).pipe(delay(1000));
  }

  getService(id: number): Observable<any> {
    return this._http.get(this.url + 'service/' + id, { headers: this.headers }).pipe(delay(1000));
  }

  saveService(dto: CreateServiceDto): Observable<any> {
    return this._http.post(this.url + 'service', dto).pipe(delay(1000));
  }

  deleteService(id: any): Observable<any> {
    return this._http.delete(this.url + 'service/' + id, { headers: this.headers }).pipe(delay(1000));
  }

  updateService(dto: UpdateServiceDto): Observable<any> {
    return this._http.patch(this.url + 'service', dto, { headers: this.headers }).pipe(delay(1000));
  }

}
