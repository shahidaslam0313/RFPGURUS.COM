import { Injectable } from "@angular/core";
// import { Http, Headers, Response } from '@angular/http';
import { Headers, Http, Response } from '@angular/http';
import {
    HttpClient
} from '@angular/common/http';
// import { SharedData } from '../../shared-service';

@Injectable()
export class CustomerService{
    
    constructor(private http:HttpClient, private _https : Http){
      
    }
    getview(){
        if (localStorage.getItem('currentUser')){
            // alert(JSON.parse(localStorage.getItem('currentUser')).token)
            let headers = new Headers();
             
            headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
            headers.append('Content-Type', 'application/json');      
        return this._https.get('https://apis.rfpgurus.com/ticket/Useralltikkets/', {headers: headers}).map((response: Response) => response.json());
    }
}
    support(sub, des){  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');     
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);   
return this._https.post("https://apis.rfpgurus.com/ticket/Tikketissue_For_User/",    
 JSON.stringify({
    "subject": sub,
"description": des,
}), { headers: headers })
    }
    
}