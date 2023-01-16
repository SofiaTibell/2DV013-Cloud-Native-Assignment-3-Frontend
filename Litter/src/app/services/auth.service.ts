import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', '*/*');
  endpoint = 'auth/api/';

  constructor(
    private http: HttpClient,
    public router: Router,
    private alertService: AlertService
  ) {}

  // login - Gets gitlab login url
  loginHref(): any {
    return this.http
      .get(`${this.endpoint}GitHub/loginurl`, { responseType: 'text' })
      .subscribe((res: any) => {
        const urlParams = new URLSearchParams(res);
        const state = urlParams.get('state');
        console.log(state);
        if (state != null) {
          sessionStorage.setItem('state', state); //TODO: add time limit
          window.location.href = res;
        }
      });
  }

  getState(): string | null {
    const state = sessionStorage.getItem('state');
    return state;
  }

  removeState() {
    sessionStorage.removeItem('state');
  }

  login(
    state: string | null | undefined,
    code: string | null | undefined
  ): any {
    if (state == this.getState()) {
      this.removeState();
      return this.http
        .post<any>(`${this.endpoint}GitHub/login`, { code: code })
        .subscribe((res: any) => {
          if (res.token) {
            localStorage.setItem('access_token', res.token);
            this.router.navigate(['/profile']);
            this.log('You are logged in', 'success');
          } else {
            this.router.navigate(['/']);
            this.log('Oops something went wrong', 'alert');
          }
        });
    } else {
      this.router.navigate(['/']);
      this.log('Oops something went wrong', 'alert');
    }
  }

  logout() {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/']);
      this.log('You are logged out', 'success');
    }
  }

  getToken(): any {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  private log(message: string, type: string): void {
    this.alertService.add(message, type);
  }

  getUsers() {
    return this.http.get<any>(`${this.endpoint}Users`);
  }

  getUser(UserId: string) {
    return this.http.get<any>(`${this.endpoint}User/${UserId}`);
  }

  getId() {
    const tokenInfo = this.getDecodedAccessToken(this.getToken());
    return tokenInfo.uid;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
