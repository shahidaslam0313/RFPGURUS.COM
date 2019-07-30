import { SetHeaders } from './../../../AuthGuards/auth.interceptor';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
// import { Headers, Http, Response } from '';
import swal from 'sweetalert2';
@Injectable()
export class PricingService {
    constructor(private http: HttpClient, private authInterceptor: SetHeaders,private _https : Http) { }

    get_card_info() {
        // return this.http.get('https://apis.rfpgurus.com/payment/cardinfo/');
        return this.http.get('https://apis.rfpgurus.com/payment/cardinfo/')
        // .map(response => response.json());
        // return this.authInterceptor.get('https://apis.rfpgurus.com/payment/cardinfo/');
    }

    authenticate_service(uid) {
        return this.http.get('https://apis.rfpgurus.com/activate/' + uid);
    }
pricingimage(){
    return this.http.get('https://apis.rfpgurus.com/super/pricing_images/');
}
    // this.isright,this.model.cardNumber, this.model.expirationdate,this.model.cardcod,this.var_get_id,this.data.course_id,this.model.cardtype,this.model.holdername,this.pkg_detail['type'],this.pkg_detail['dur']
    package_free(isright, cardNumber, expirationdate, cardcod, var_get_id, cardtype, holdername, pkg_type, pkg_dur) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');     
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        return this._https.post("https://apis.rfpgurus.com/package/",
            JSON.stringify({
                "id": cardNumber,
                "pricepackage": pkg_type,
                "duration": pkg_dur
            }), { headers: headers }).map((data: Response) => data.json());
        
    }

    package_free_trial(isright, cardNumber, expirationdate, cardcod, var_get_id, cardtype, holdername, pkg_type, pkg_dur) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');     
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        return this._https.post("https://apis.rfpgurus.com/free_Trail/",
            JSON.stringify({
                "package_detail": pkg_type,
                "card_info": cardNumber
            }),{ headers: headers }).map((res: Response) => {
                if (res.status == 200) {
                    swal(
                        'Your payment is posted successfully',
                        '',
                        'success'
                    )
                    res.json();
                }
            })
    }

    updateCard(var_status, id, name, cardno, ccv, expiryDate, address, zip, city, state, country, set_auto_pay) {
        return this.http.put('https://apis.rfpgurus.com/payment/cardinfo/',
            JSON.stringify({
                // "cardNumber": cardno,
                "default": var_status,
                "cid": id,
                "name": name,
                // "pinCode": pin,
                "street_address": address,
                "zipcode": zip,
                "city": city,
                "state": state,
                "country": country,
                "number": cardno,
                "cvc": ccv,
                "expDate": expiryDate,
                "autopay": set_auto_pay
            }), { headers: this.authInterceptor.setHeaders() });
    }
}
