import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
// import { Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
// import { HttpService } from '../../../service/http-service';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ForgetPasswordService {
    constructor(private _http5: Http, private _https : Http) { }
    loaded: boolean = false;
    change_password(pass1, pass2, code) {
        const headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this._http5.put('https://apis.rfpgurus.com/change_password/', JSON.stringify(
            {
                "pass1": pass1,
                "pass2": pass2,
                "code": code
            }), { headers: headers }).map((res: Response) => res.json())
    }
    checkUse(code) {
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');     
        // headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        return this._https.get('https://apis.rfpgurus.com/checklinkuse/' + code).map(response => response.json());
    }
}