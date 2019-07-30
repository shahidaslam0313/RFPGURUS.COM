
import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "angular4-social-login";


declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    
];
@Component({
    selector: 'user-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css'],
})

export class SidebarComponent {
  
    constructor(private authService: AuthService,private route: ActivatedRoute,private _nav:Router) {

    }
    private authentication=localStorage.getItem('token');

   
   
  
    
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
    logout() {
        this.authService.signOut();        
        localStorage.clear();

        swal({
            type: 'success',
            title: 'Successfully Logged out',
            showConfirmButton: false,
            timer: 1500
        });

        this._nav.navigate(['/']);
    }
     
}
