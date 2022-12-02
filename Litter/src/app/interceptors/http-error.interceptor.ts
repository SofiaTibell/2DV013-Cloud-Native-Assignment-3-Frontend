import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,        HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service'

@Injectable()

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(request)
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else if (error.status === 401) {
          this.log('Unauthorized!', 'alert');
        } else if (error.status === 403) {
          this.log('Forbidden!', 'alert');
        } else if (error.status === 404) {
          this.log('Not Found!', 'alert');
        } else if (error.status === 409) {
          this.log('Conflict!', 'alert');
        } else if (error.status === 500) {
          this.log('Oops something went wrong', 'alert');
        }
        else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        if (errorMessage !== '') {
          window.alert(errorMessage);
        }
        return throwError(errorMessage);
      })
    );
  }

  private log(message: string, type: string): void {
    this.alertService.add(message, type);
  }
}
