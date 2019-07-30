import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FooterService {
    constructor(private http: HttpClient) { }
    subcribe(email: string) {
        return this.http.post('https://apis.rfpgurus.com/subscription/',
         { 'email': email, })
    }
}