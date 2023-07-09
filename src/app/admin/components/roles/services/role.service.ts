import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Global } from '../../../../config/global_url';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public url: string;
  public headers: HttpHeaders;

  constructor(private _http: HttpClient,) {
    this.url = Global.url;
  }

  getRoles(): Observable<any> {
    return this._http.get(this.url + 'role', { headers: this.headers }).pipe(delay(1000));
  }

  getRole(id: number): Observable<any> {
    return this._http.get(this.url + 'role/' + id, { headers: this.headers }).pipe(delay(1000));
  }

  saveRole(dto: CreateRoleDto): Observable<any> {
    return this._http.post(this.url + 'role', dto).pipe(delay(1000));
  }

  deleteRole(id: any): Observable<any> {
    return this._http.delete(this.url + 'role/' + id, { headers: this.headers }).pipe(delay(1000));
  }

  updateRole(dto: UpdateRoleDto): Observable<any> {
    return this._http.patch(this.url + 'role', dto, { headers: this.headers }).pipe(delay(1000));
  }

}
