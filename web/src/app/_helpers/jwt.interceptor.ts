import { PrimaveraService } from './../_services/primavera.service';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private primaveraAuthService: PrimaveraService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request);
        if (request.url.includes(environment.primaveraUrl)) {
            // add authorization header for primavera web api if available
            console.log('Sending to primavera');
            const currentToken = this.primaveraAuthService.currentTokenValue;
            if (currentToken && currentToken.access_token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentToken.access_token}`
                    }
                });
            }
        } else {
            // add authorization header with jwt token if available
            const currentUser = this.authenticationService.currentUserValue;
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
            }
        }
        return next.handle(request);
    }
}
