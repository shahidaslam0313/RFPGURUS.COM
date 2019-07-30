import { SetHeaders } from './../../../AuthGuards/auth.interceptor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers , Response} from '@angular/http'

@Injectable()
export class HeaderService {
  constructor(private http: HttpClient, private authInterceptor: SetHeaders, private _http:Http) { }

  logdetail() {
    return this.http.get('https://apis.rfpgurus.com/rf_p/logDetail/')
  }

  notify() {
    return this.http.get('https://apis.rfpgurus.com/user_notifications/');
  }

  deletenotify(id: string) {
    return this.http.delete('https://apis.rfpgurus.com/read_delete/' + id + '/');
  }

  Updatenotify(id: string) {
    return this.http.put('https://apis.rfpgurus.com/read_delete/' + id + '/', JSON.stringify({})
      , { headers: this.authInterceptor.setHeaders() });
  }
  Watchlist() {
    let headers = new Headers();
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    headers.append('Content-Type', 'application/json');
    return this._http.get('https://apis.rfpgurus.com/rf_p/watchlist/',
    {headers: headers}).map((response: Response) => response.json());
  }

  deleteallnotify() {
    return this.http.delete('https://apis.rfpgurus.com/delete_all_notification/');
  }

  deleteWatchlist(rfpid: string) {
    return this.http.delete('https://apis.rfpgurus.com/rf_p/watchlistdelete/' + rfpid);
  }

  AlldeleteWatchlist() {
    let headers = new Headers();
  if(localStorage.getItem('currentUser')){
    headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    }  
  headers.append('Content-Type', 'application/json');
    return this._http.delete('https://apis.rfpgurus.com/rf_p/Delete_all_watch_list/', {headers: headers}).map((response: Response) => response.json());
  }

  searchrecord(obj: string) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/search_id/' + obj + '/10?page=1');
  }

  searchSuggestions(obj: string) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/search_key/' + '15?page=1', { "query": obj });
  }


}
