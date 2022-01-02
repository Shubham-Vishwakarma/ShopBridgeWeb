import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/auth/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const jwtToken = this.authService.user?.token;

    if(jwtToken) {
      const aRequest = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + jwtToken)
      });

      return next.handle(aRequest);
    }

    return next.handle(request);
  }
}
