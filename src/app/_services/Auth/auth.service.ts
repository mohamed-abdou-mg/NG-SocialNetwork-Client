import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginModel } from 'src/app/_models/Authentication/login.model';
import { RegisterModel } from 'src/app/_models/Authentication/register.model';
import { AuthResponse } from 'src/app/_models/Authentication/Responses/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSource = new ReplaySubject<AuthResponse>(1);
  currentUser$ = this.currentUserSource.asObservable();
  baseUrl: string = "https://localhost:44388/api/";

  constructor(private http: HttpClient) { }

  Login(loginModel: LoginModel) {
    return this.http.post<AuthResponse>(this.baseUrl + "Accounts/Login", loginModel).pipe(
      map((response) => {
        if(response){
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUserSource.next(response);
        }
      })
    );
  }

  Register(registerModel: RegisterModel) {
    return this.http.post<AuthResponse>(this.baseUrl + "Accounts/Register", registerModel).pipe(
      map((response) => {
        if(response){
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUserSource.next(response);
        }
      })
    );
  }

  setCurrentUser(authResponse: AuthResponse){
    this.currentUserSource.next(authResponse);
  }

  Logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}