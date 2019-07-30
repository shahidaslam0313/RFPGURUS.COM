import { SetHeaders } from './../../../AuthGuards/auth.interceptor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ForgetPasswordService {
    constructor(private http: HttpClient, private authInterceptor: SetHeaders,private _https : Http) { }
    change_password(pass1, pass2, code) {
        return this.http.put('https://apis.rfpgurus.com/change_password/', JSON.stringify(
            {
                "pass1": pass1,
                "pass2": pass2,
                "code": code
            }), { headers: this.authInterceptor.setHeaders() });
    }
    checkUse(code) {
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');     
        // headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        return this._https.get('https://apis.rfpgurus.com/checklinkuse/link/' + code).map(response => response.json());
    }
}