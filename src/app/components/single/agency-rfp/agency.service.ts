import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class AgencyService {

    constructor(private http: HttpClient,private _https : Http) { }
    staterecord(agency, items, page) {
        let headers = new Headers();
    if(localStorage.getItem('currentUser')){
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
       
      headers.append('Content-Type', 'application/json');
        return this._https.get('https://apis.rfpgurus.com/rf_p/agency_web/' + agency + '/' + items + '?page=' + page,{ headers:headers}).map((response: Response) => response.json());
    }
    else{
        return this._https.get('https://apis.rfpgurus.com/rf_p/agency_web/' + agency + '/' + items + '?page=' + page).map((response: Response) => response.json());

    }
    }

    downloadFile(id) {

        return this.http.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/');
    }
}
