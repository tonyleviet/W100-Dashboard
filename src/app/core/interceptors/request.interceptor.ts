import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorResponse } from '../services/base.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const reqUpdate = req.clone({});

    return next.handle(req);
    // .pipe(
    //   catchError((err) => {
    //     console.error('HttpInterceptor', err)

    //     let errorResponse: ErrorResponse;
    //     const { status, error, statusText } = err;

    //     if (status === 500) {
    //       errorResponse = { status, code: 'SERVER_ERROR', message: statusText, debugMessage: error };
    //     } else if (status === 503) {
    //       document.body.innerHTML = error.html_content;
    //       errorResponse = error;
    //     } else if (status === 0) {
    //       errorResponse = { status, code: 'SERVER_ERROR', message: statusText };
    //     } else if (status === 401) {
    //       // const authService = this.getAuthService();
    //       // if (authService.isLoggedIn) {
    //       //   // logout users, redirect to login page
    //       //   authService.logout();
    //       //   authService.setCurrentReturnUrl();
    //       //   authService.goToLoginPage();
    //       // }
    //       errorResponse = error;
    //     } else {
    //       errorResponse = error;
    //     }

    //     return throwError(errorResponse);
    //   })
    // );
  }
}
