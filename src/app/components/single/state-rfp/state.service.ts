
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
@Injectable()
export class StateService {
  constructor(private http: HttpClient,private _https : Http) {  }

  staterecord(state, items, page) {
    let headers = new Headers();
    if(localStorage.getItem('currentUser')){
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
       
      headers.append('Content-Type', 'application/json');
    return this._https.get('https://apis.rfpgurus.com/rf_p/std_web/' + state + '/' + items + '?page=' + page,{ headers:headers}).map((response: Response) => response.json());
    }
    else{
      return this.http.get('https://apis.rfpgurus.com/rf_p/std_web/' + state + '/' + items + '?page=' + page);
    }
  }

  downloadFile(id) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/');
  }

  unsub_staterecord(state, items, page) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/unsub_std/' + state + '/' + items + '?page=' + page);
  }
}
