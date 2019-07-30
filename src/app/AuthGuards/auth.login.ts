import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AuthLogin implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentadmin') || localStorage.getItem('loged_in')) {
            // logged in so return true
            this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
           
        }
     
        // not logged in so redirect to login page with the return url
        return true;
        
    }
   
}
