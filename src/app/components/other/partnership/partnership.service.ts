import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class partnershipservice {
  constructor(private http: HttpClient) { }
  fun_insert_value(name, email, company_name, des) {
    return this.http.post('https://apis.rfpgurus.com/becomePartner/',
      {
        'name': name,
        'email': email,
        'company_name': company_name,
        'message': des,
      }).map((res: Response) => console.log(res))
  }
}