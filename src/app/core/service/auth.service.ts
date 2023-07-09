import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { delay, map, mergeMap } from "rxjs/operators";

import { AuthResponse } from "../../models/utils/auth-response";
import { Global } from "./global";
import { LoginDto } from "../dto/login.dto";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthResponse>;
  public currentUser: Observable<AuthResponse>;
  public url: string;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = Global.url;
    this.currentUserSubject = new BehaviorSubject<AuthResponse>(
      JSON.parse(localStorage.getItem("currentUser")!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthResponse {
    return this.currentUserSubject.value;
  }


  login(dto: LoginDto): Observable<AuthResponse> {
    return this._http.post(this.url + 'auth/login', dto).pipe(delay(1000), mergeMap((user: any) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      const authResponse: AuthResponse = {
        user: user.user,
        token: user.token
      };

      localStorage.setItem("currentUser", JSON.stringify(authResponse));
      this.currentUserSubject.next(authResponse);
      return of(authResponse);
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null!);
    return of({ success: false });
  }
}
