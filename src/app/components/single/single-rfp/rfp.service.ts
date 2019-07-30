import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class RfpService {

  constructor(private http: HttpClient,private _https : Http) {  }

  postWatchlist(rfpid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     
    headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
    return this._https.post('https://apis.rfpgurus.com/rf_p/watchlist/', JSON.stringify({
      "rfp": rfpid
    }),{headers:headers}).map((res: Response) => res.json() );
  }

  rfprecord(id, val) {
    if (val == 'old') {
      return this.http.get('https://apis.rfpgurus.com/rf_p/old_rfpdata_web/' + id + '/');
    }
    else {
      return this.http.get('https://apis.rfpgurus.com/rf_p/rfpdata_web/' + id + '/');
    }
  }

  downloadFile(id) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/');
  }

}
