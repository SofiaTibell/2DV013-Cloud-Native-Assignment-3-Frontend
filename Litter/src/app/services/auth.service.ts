import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  endpoint = 'api/v1/auth/';

  constructor(
    private http: HttpClient,
    public router: Router,
    private alertService: AlertService) { }

  login(): any {
    localStorage.setItem('access_token', 'acces');
        this.router.navigate(['/profile']);
        this.log('You are logged in', 'success');
    return
    // TODO: add endpoint here
    return this.http.get<any>(`${this.endpoint}login`)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.access_token);
        this.router.navigate(['/profile']);
        this.log('You are logged in', 'success');
      });
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
    return (authToken !== null) ? true : false;
  }

  private log(message: string, type: string): void {
    this.alertService.add(message, type);
  }
}
