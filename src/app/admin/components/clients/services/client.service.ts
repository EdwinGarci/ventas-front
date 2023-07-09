import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CreateClientDto } from '../dto/create-client.dto';
import { Global } from '../../../../config/global_url';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public url: string;
  public headers: HttpHeaders;

  constructor(private _http: HttpClient,) {
    this.url = Global.url;
  }

  getClients(): Observable<any> {
    return this._http.get(this.url + 'client', { headers: this.headers }).pipe(delay(1000));
  }

  getClient(id: number): Observable<any> {
    return this._http.get(this.url + 'client/' + id, { headers: this.headers }).pipe(delay(1000));
  }

  saveClient(dto: CreateClientDto): Observable<any> {
    return this._http.post(this.url + 'client', dto).pipe(delay(2000));
  }

  deleteClient(id: any): Observable<any> {
    return this._http.delete(this.url + 'client/' + id, { headers: this.headers }).pipe(delay(2000));
  }

  updateClient(dto: UpdateClientDto): Observable<any> {
    return this._http.patch(this.url + 'client', dto, { headers: this.headers }).pipe(delay(2000));
  }

}
