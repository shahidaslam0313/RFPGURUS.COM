import { SetHeaders } from './../../../AuthGuards/auth.interceptor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';


@Injectable()
export class ProfileService {

    constructor(private http: HttpClient, private authInterceptor: SetHeaders,private _https : Http) { }

    get_preferances(uid) {
        return this.http.get('https://apis.rfpgurus.com/preferance_Updates/' + uid + '/');
    }
    token;
    get_profile() {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
         
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        return this._https.get('https://apis.rfpgurus.com/user_information/',{headers:headers}).map(response => response.json());
    }
    ProfileUpdate(obj) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
         
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        let userlist: any = [];
        let jsonlist = {};
        jsonlist = {
            "zipcode": obj.zipcode,
            "city": obj.city,
            "address": obj.address,
            "company": obj.companyname,
            "country": obj.country,
            "state": obj.state,
            "phone": obj.phone,
            "email": obj.email,
            "first_name": obj.firstname,
            "last_name": obj.lastname,
            "username": obj.username,
            // "newsletter": obj.newsletter,
        }
      
     
        return this._https.put('https://apis.rfpgurus.com/profile_update/',JSON.stringify(jsonlist),{headers:headers}).map(response => response.json()
            // JSON.stringify(jsonlist), { headers: this.authInterceptor.setHeaders()
            //  }
            );
    }
    peraferanceUpdate(obj, catlist, statePreference, countyPreference, cityPreference, agencyPreference) {
        let userlist: any = [];
        if (catlist.length == 0) {
            catlist = null;
        }
        if (statePreference.length == 0) {
            statePreference = null;
        }
        if (countyPreference.length == 0) {
            countyPreference = null;
        }
        if (cityPreference.length == 0) {
            cityPreference = null;
        }
        if (agencyPreference.length == 0) {
            agencyPreference = null;
        }
        let jsonlist = {};
        jsonlist = {
            "newsletter": obj.newsletter,
            "usercat": catlist,
            "preferagency": agencyPreference,
            "prefercities": cityPreference,
            "prefercounty": countyPreference,
            "prefersate": statePreference
        }

        return this.http.put('https://apis.rfpgurus.com/preferance_Updates/' + JSON.parse(localStorage.getItem('currentUser')).username + '/',
            JSON.stringify(jsonlist), { headers: this.authInterceptor.setHeaders() });
    }
}