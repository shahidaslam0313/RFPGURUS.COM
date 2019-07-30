import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AllStateService {
    constructor(private http: HttpClient) { }
    searchrecord(obj) {
        return this.http.get('https://apis.rfpgurus.com/rf_p/search_state/' + obj + '/');
    }
}