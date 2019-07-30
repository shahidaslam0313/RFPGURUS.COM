import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AllAgenciesService {
    constructor(private http: HttpClient) { }
    rfpagency() {
        return this.http.get('https://apis.rfpgurus.com/rf_p/allagency/')
    }
    searchrecord(obj) {
        return this.http.get('https://apis.rfpgurus.com/rf_p/search_agency/' + obj + '/');
    }

    rfpagencieswithpagination(rfps) {
        return this.http.get('https://apis.rfpgurus.com/rf_p/allagencies_for_web/' + rfps)
    }
}