import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResultsService {
    currentUser;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    sortby(obj, cat, page, pageSize) {
        if (obj == 'title' || obj == 'state') {
            var order = 'asc';
        }
        else {
            var order = 'desc';
        }
        return this.http.post('https://apis.rfpgurus.com/rf_p/search_with_sort/' + pageSize + '/' + obj + '/' + order + '?page=' + page, { "query": cat });
    }
    searchrfprecord(obj, items, page) {
        return this.http.post('https://apis.rfpgurus.com/rf_p/search_id_web/' + items + '?page=' + page, {
            'query': obj
        });
    }
    toalsearchrecord(obj) {
        return this.http.get('https://apis.rfpgurus.com/rf_p/totalrfp/' + obj + '/10?page=1');

    }
    downloadFile(id) {
        return this.http.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/');
    }

}
