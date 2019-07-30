import { SetHeaders } from './../../../AuthGuards/auth.interceptor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';


@Injectable()
export class ChangedPasswordService {
    currentUser;

    constructor(private http: HttpClient, private authInterceptor: SetHeaders,private _https : Http) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    user_change_password(oldpass, pass1, pass2) {
          let headers = new Headers();
    headers.append('Content-Type', 'application/json');     
    headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        return this._https.put('https://apis.rfpgurus.com/user_change_password/' + this.currentUser.username + '/',
            JSON.stringify({
                "currentPassword": oldpass,
                "newPassword": pass1,
                "newPassword2": pass2,
            }), { headers: headers })
    }
}