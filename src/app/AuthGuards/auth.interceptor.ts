import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (localStorage.getItem('currentUser')) {
            const idToken = JSON.parse(localStorage.getItem('currentUser')).token;

            const cloned = req.clone({
                headers: req.headers
                    .set('Authorization', 'JWT ' + idToken)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}

@Injectable()
export class SetHeaders {
    headers;
    setHeaders() {
        return this.headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    }
}