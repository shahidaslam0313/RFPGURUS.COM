import { SetHeaders } from './../AuthGuards/auth.interceptor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class MainService {

    constructor(private http: HttpClient, private authInterceptor: SetHeaders,private _https : Http) { }
    purchaseHistory() {
        return this.http.get('https://apis.rfpgurus.com/payment/history/' + JSON.parse(localStorage.getItem('currentUser')).username + '/');
    }
    trialHistory() {
        return this.http.get('https://apis.rfpgurus.com/trail_history/');
    }
    deactivetrial() {
        let headers = new Headers();
        headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
        headers.append('Content-Type', 'application/json');
        return this._https.get('https://apis.rfpgurus.com/deactivate_trail/', {headers:headers}).map((response: Response) => response.json());
    }

    expirePackage(expDate) {
        return this.http.post("https://apis.rfpgurus.com/payment/history/" + JSON.parse(localStorage.getItem('currentUser')).username + "/",
            JSON.stringify({
                'pkgdate': expDate
            }));
    }

    packageUpdate(pkgdetail) {
        return this.http.put("https://apis.rfpgurus.com/payment/history/" + JSON.parse(localStorage.getItem('currentUser')).username + "/",
            JSON.stringify({
                'pricepackage': pkgdetail.type,
                'duration': pkgdetail.dur,
                'creditno': pkgdetail.credit,
                'exp': pkgdetail.expdate,
                'ccv': pkgdetail.ccv
            }), { headers: this.authInterceptor.setHeaders() });
    }

    // ==================== Common Apis ====================

    allCategories = new Subject<any>();
    allStates = new Subject<any>();

    rfpcategory() {
        return this.http.get('https://apis.rfpgurus.com/rf_p/allcategory/')
            .subscribe(resp => {
                this.allCategories.next(resp);
            })
    }

    rfpstate() {
        return this.http.get('https://apis.rfpgurus.com/rf_p/allstate/')
            .subscribe(resp => {
                this.allStates.next(resp);
            })
    }





}
