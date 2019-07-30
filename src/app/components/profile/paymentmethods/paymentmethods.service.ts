
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import swal from 'sweetalert2';
import { Http, Headers, Response } from '@angular/http';
import { SetHeaders } from 'src/app/AuthGuards/auth.interceptor';

@Injectable()
export class PaymentmethodsService {
  constructor(private http: HttpClient,private _https : Http, private authInterceptor: SetHeaders) {  }
  // let headers = new Headers();
  //       headers.append('Content-Type', 'application/json');
         
  //       headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
  //       return this._https.get('https://apis.rfpgurus.com/user_information/' + uid + '/',{headers:headers}).map(response => response.json());
 
  addCard( name, address, zip, city, state, country, cardno, ccv, expiryDate, var_type_atm, setautopay, nickname) {
    let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
      return this._https.post('https://apis.rfpgurus.com/payment/cardInfo_web/',
      JSON.stringify({
        "name": name,
        "street_address": address,
        "zipcode": zip,
        "city": city,
        "state": state,
        "country": country,
        "number": cardno,
        "cvc": ccv,
        "expDate": expiryDate,
        "card_type": var_type_atm,
        "autopay": setautopay,
        "nickname": nickname
      }),{headers:headers}).map(response => response.json())
      // .map((res: Response) => {
      //   if (res) {
      //     if (res.status === 201 || res.status === 200 || res.status === 302 ) {
      //       const responce_data = res.json();
      //       return responce_data;
      //     }
      //   }
      // })
      // .catch((error: any) => {
      //   if (error.status === 302) {
      //     swal({
      //       type: 'error',
      //       title: error.message,
      //       showConfirmButton: false,
      //       timer: 1500, width: '512px',
      //     })
      //     return Observable.throw(new Error(error.status));
      //   } else if (error.status === 405) {
      //     swal({
      //       type: 'error',
      //       title: error.message,
      //       showConfirmButton: false,
      //       timer: 1500, width: '512px',
      //     })
      //     return Observable.throw(new Error(error.status));
      //   }
      //   else if (error.status === 406) {
      //     swal({
      //       type: 'error',
      //       title: error.message,
      //       showConfirmButton: false,
      //       timer: 1500, width: '512px',
      //     })
      //     return Observable.throw(new Error(error.status));
      //   } else if (error.status === 403) {
      //     swal({
      //       type: 'error',
      //       title: error.message,
      //       showConfirmButton: false,
      //       timer: 1500, width: '512px',
      //     })
      //     return Observable.throw(new Error(error.status));
      //   }
      //   else if (error.status === 400) {
      //     swal({
      //       type: 'error',
      //       title: 'Bad Request',
      //       showConfirmButton: false,
      //       timer: 1500, width: '512px',
      //     })
      //     return Observable.throw(new Error(error.status));
      //   }
      // });
  }
  deleteCard(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
    return this._https.delete('https://apis.rfpgurus.com/payment/cardinfodelete/' + id,{headers: headers });
  }
  Atm_card_exist(card) {
    return this.http.post('https://apis.rfpgurus.com/payment/cardnoexist/',
      JSON.stringify({
        'number': card
        
      }),
      
      );
  }
}