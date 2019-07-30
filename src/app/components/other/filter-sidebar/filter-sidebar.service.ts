import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FilterSidebarService {

    constructor(private http: HttpClient) { }
    rfpcategory() {
        return this.http.get('https://apis.rfpgurus.com/rf_p/category/');
    }
    staterfp() {
        alert("services");
        return this.http.get('https://apis.rfpgurus.com/rf_p/state/');
    }

    agencies() {
        return this.http.get('https://apis.rfpgurus.com/rf_p/agencies_for_web_menu/');
    }

}