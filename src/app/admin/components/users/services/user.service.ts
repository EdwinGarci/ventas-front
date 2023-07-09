import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../models/user.model';
import { Global } from '../../../../config/global_url';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public headers!: HttpHeaders;

  isTblLoading = true;
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = Global.url;
  }

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getUsers(): void {
    this._http.get<User[]>(this.url + 'users')
    .pipe(finalize(() => { this.isTblLoading = false; }))
    .subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
      }
    );
  }

  ngOnDestroy(): void {}

  getUserss(): Observable<any> {

    return this._http.get(this.url + 'users', { headers: this.headers }).pipe(delay(1000));
  }

  addUser(dto: CreateUserDto): void {
    this.dialogData = User;

    this._http.post(this.url + 'users', dto).subscribe(data => {
      this.dialogData = data;
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }

  saveUser(object: CreateUserDto): Observable<any> {
    this.dialogData = User;

    return this._http.post(this.url + 'users', object, { headers: this.headers }).pipe(delay(2000));
  }

  deleteUser(id: any): Observable<any> {
    return this._http.delete(this.url + 'users/' + id, { headers: this.headers }).pipe(delay(2000));
  }

  updateUser(dto: UpdateUserDto): Observable<any> {
    //let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.patch(this.url + 'users', dto, { headers: this.headers }).pipe(delay(2000));
  }

}
