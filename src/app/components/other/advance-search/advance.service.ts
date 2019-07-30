import { SetHeaders } from './../../../AuthGuards/auth.interceptor';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class AdvanceService {

  constructor(private http: HttpClient, private authInterceptor: SetHeaders,private _https : Http) { }
  // trial_document(id) {
  //   return this.http.get('https://apis.rfpgurus.com/document_trial/' + id);
  // }
  trial_document(id) {
    // let headers = new Headers();
    //   headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    //   headers.append('Content-Type', 'application/json');
    let uri = 'https://apis.rfpgurus.com/document_trial_for_web/' + id + '/' +JSON.parse(localStorage.getItem('currentUser')).userid
    return this.http.get(uri).map((response: Response) => response.json());
}
downloadRfp(){
  let headers = new Headers();
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
    return this._https.get('https://apis.rfpgurus.com/rf_p/document_link/',  {headers:headers}).map((response: Response) => response.json())
}
downloadRfps(id){
  let headers = new Headers();
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
    return this._https.get('https://apis.rfpgurus.com/rf_p/document_link_with_extention/'+id,  {headers:headers}).map((response: Response) => response.json())
}
//https://apis.rfpgurus.com/rf_p/document_link_with_extention/(rfp_id)
// https://apis.rfpgurus.com/rf_p/document_link/
  dropdown(state, agency, category, sub_category) {
        
    return this.http.post('https://apis.rfpgurus.com/rf_p/drop_down/', JSON.stringify({
      "state": state,
      "agency": agency,
      "category": category,
      "sub_category": sub_category
    }), { headers: this.authInterceptor.setHeaders() });
  }
  admindropdown(state) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/add_rfp_dropdown/', JSON.stringify({
      "state": state,
    }));
  }
  oldcategories(old) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/get_new_cat_sub/', JSON.stringify({
      "old_cat": old,
    }));
  }
  rfpcity(value) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');     
    // headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
    return this.http.post('https://apis.rfpgurus.com/county_city', JSON.stringify({ "county": value }),{headers:this.authInterceptor.setHeaders()});
  }
  rfpcounty(value) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');     
    // headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
    return this.http.post('https://apis.rfpgurus.com/state_county', JSON.stringify({ "state": value }),{headers: this.authInterceptor.setHeaders() });
  }
  rfpagency(value) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');     
    // headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
    return this.http.post('https://apis.rfpgurus.com/state_agency', JSON.stringify({ "state": value }),{headers: this.authInterceptor.setHeaders() });
  }
  rfpagen() {
    return this.http.get('https://apis.rfpgurus.com/rf_p/allagencies/');
  }
  rfpsubcat(val) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/searchby_multiple_categories/', JSON.stringify({ "category": val }));
  }
  rfpsinglesubcat(val) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/search_sub_category/', JSON.stringify({ "category": val }),{headers:this.authInterceptor.setHeaders()});
  }
  downloadFile(id) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/');
  }
  advancesearch(Rfpnum, title, status, enterdate, duedate, state, agency, cat, items, page, subcate) {
      
    let headers = new Headers();
    if(localStorage.getItem('currentUser')){
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
    return this._https.put('https://apis.rfpgurus.com/rf_p/advance_web/' + items + '/?page=' + page,
      JSON.stringify({
        "rfp_key": Rfpnum,
        "title": title,
        "status": status,
        "posted_from": enterdate,
        "posted_to": duedate,
        "state": state,
        "agency": agency,
        "category": cat,
        "sub_category": subcate
      }), { headers: headers }).map((response: Response) => response.json());
    }
    else
    {
      return this.http.put('https://apis.rfpgurus.com/rf_p/advance_web/' + items + '/?page=' + page,
      JSON.stringify({
        "rfp_key": Rfpnum,
        "title": title,
        "status": status,
        "posted_from": enterdate,
        "posted_to": duedate,
        "state": state,
        "agency": agency,
        "category": cat,
        "sub_category": subcate
      }), { headers: this.authInterceptor.setHeaders() });
    }

  }
  searchrfprecord(Rfpnum, title, status, enterdate, duedate, state, agency, cat, items, page, subcat, submissionfrom, submissionto) {
    
    let headers = new Headers();
    if(localStorage.getItem('currentUser')){
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
       
      headers.append('Content-Type', 'application/json');
      return this._https.put('https://apis.rfpgurus.com/rf_p/filters/' + items + '/?page=' + page,
      JSON.stringify({
        "rfp_key": Rfpnum,
        "title": title,
        "status": status,
        "posted_from": enterdate,
        "posted_to": duedate,
        "state": state,
        "agency": agency,
        "category": cat,
        "sub_category": subcat,
        "submission_from": submissionfrom,
        "submission_to": submissionto
      }), { headers: headers }).map((response: Response) => response.json())
    }
    else{
      return this.http.put('https://apis.rfpgurus.com/rf_p/filters/' + items + '/?page=' + page,
      JSON.stringify({
        "rfp_key": Rfpnum,
        "title": title,
        "status": status,
        "posted_from": enterdate,
        "posted_to": duedate,
        "state": state,
        "agency": agency,
        "category": cat,
        "sub_category": subcat,
        "submission_from": submissionfrom,
        "submission_to": submissionto
      }), { headers: this.authInterceptor.setHeaders() });
    }
  }
}
