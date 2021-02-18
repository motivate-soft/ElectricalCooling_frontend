import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        // this.authService.getToken().pipe(
        //     switchMap((token: NbAuthToken) => {
        //         req = req.clone({
        //             setHeaders: headersConfig,
        //         });
        //         return next.handle(req);
        //     }),
        // )
        const request = req.clone({ setHeaders: headersConfig });
        return next.handle(request);
    }

    // protected get authService(): NbAuthService {
    //     return this.injector.get(NbAuthService);
    // }
}
