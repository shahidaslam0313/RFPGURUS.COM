import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient,private _https:Http) { }

  searchrecord(id: string) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/search_id/' + id + '/')
  }

  latestrfps() {
    return this.http.get('https://apis.rfpgurus.com/rf_p/latest/10?page=1')
  }

  rfpcategory() {
    return this.http.get('https://apis.rfpgurus.com/rf_p/allcategory/')
  }

  rfpstate() {
    return this.http.get('https://apis.rfpgurus.com/rf_p/allstate/')
  }

  usersubscribe(username: string) {
    return this.http.post('https://apis.rfpgurus.com/pkg_sub/', { 'username': username });
  }
  get_card_infos() {
    
    return this.http.get('https://apis.rfpgurus.com/payment/cardinfo/')
   
}
gettimer(){
  return this._https.get('https://apis.rfpgurus.com/super/timer_for_sale/')
}
}
