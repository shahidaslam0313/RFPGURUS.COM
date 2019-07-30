import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AllCategoryService {
    constructor(private http: HttpClient) { }
    rfpcategory_subsat() {
        return this.http.get('https://apis.rfpgurus.com/rf_p/allcat_Web/');
    }
    searchrecord(obj) {
        return this.http.get('https://apis.rfpgurus.com/rf_p/cat_search_Web/' + obj + '/');
    }
}