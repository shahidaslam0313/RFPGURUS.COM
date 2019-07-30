import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class ContactUsService {
  constructor(private http: HttpClient, private _nav: Router) { }
  contact(name, email, phone, message) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/message',
      {
        'name': name,
        'email': email,
        'phone': phone,
        'address': message
      })
  }

}
