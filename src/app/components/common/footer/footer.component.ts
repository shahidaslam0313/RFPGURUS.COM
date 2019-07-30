import { Component } from '@angular/core';
import { FooterService } from './footer.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: 'app-footer',
    styleUrls: ['./footer.component.css'],
    templateUrl: 'footer.component.html',
})
export class FooterComponent {
  
    constructor( private _serv: FooterService) { }
   
    form = new FormGroup({
        email: new FormControl("", Validators.compose([Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ]))
    })
    get email() {
        return this.form.get('email');
    }
    check_login() {
        if (localStorage.getItem('loged_in')) {
            return true;
        } else {

            return false;
        }
    }
    check_adminlogin() {
        if (localStorage.getItem('currentadmin')) {

            return true;
        } else {

            return false;
        }
    }
    ngOnInit() {
      
    }
    onSubmit(email, f: NgForm) {
        this._serv.subcribe(email).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'Successfully subscribed',
                    showConfirmButton: false,
                    timer: 1500, width: '512px',
                });
            },
            error => {
                swal(
                    'Sorry',
                    'This email has already subscribed to RFPGurus ',
                    'error'
                )
            })
            f.resetForm();
    }
}