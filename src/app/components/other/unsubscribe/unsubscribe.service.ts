import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
@Injectable()
export class UnsubscribeService {

  constructor(private http: HttpClient) { }
  unsub(uid) {
    let headers = new Headers();
    return this.http.delete('https://apis.rfpgurus.com/unsubscribe/' + uid + '/');
  }
  qurey(uid, comment) {
    let headers = new Headers();
    return this.http.post('https://apis.rfpgurus.com/unsubscribe_query/', {
      "email": uid,
      "comment": comment
    });
  }
}
