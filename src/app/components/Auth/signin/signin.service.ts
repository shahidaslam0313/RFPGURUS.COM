import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import * as moment from 'moment';
import { tap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  time;
  exp_time;

  login(username: string, password: string) {
    return this.http.post('https://apis.rfpgurus.com/user-token-auth/',
      JSON.stringify({ username: username, password: password }), this.httpOptions)
      .pipe(tap(response => {
        let decodedToken = jwt_decode(response['token']);

        let user = { userid: decodedToken.user_id, username: decodedToken.username, token: response['token'] };
        if (user && user.token) {
          this.time = new Date()
          this.exp_time = moment(this.time).add(1, 'days');
          localStorage.setItem('loged_in', '1');
          localStorage.setItem('exp', this.exp_time);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }))
  }

  login_authenticate(username) {
    return this.http.post('https://apis.rfpgurus.com/ac_login/', {
      'username': username
    }, this.httpOptions);
  }

  authenticate_service(uid) {
    return this.http.get('https://apis.rfpgurus.com/activate/' + uid,
      this.httpOptions).map((response: Response) => response.json());
  }

  forget_password(email) {
    return this.http.post('https://apis.rfpgurus.com/forget_password/', {
      'email': email
    }, this.httpOptions)
  }

}