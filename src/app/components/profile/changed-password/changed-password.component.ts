import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, NgForm } from '@angular/forms';
import { PasswordValidation } from '../../../Validators/password-validator.component';
import { ChangedPasswordService } from './changed-password.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from "angular4-social-login";
import { SeoService } from '../../../services/seoService';

declare const $: any;
declare interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}
declare interface User {
    text?: string; // required, must be 5-8 characters
    email?: string; // required, must be valid email format
    password?: string; // required, value must be equal to confirm password.
    confirmPassword?: string; // required, value must be equal to password.
    number?: number; // required, value must be equal to password.
    url?: string;
    idSource?: string;
    idDestination?: string;
    optionsCheckboxes?: boolean;
}
@Component({
    selector: 'app-changed-password',
    templateUrl: './changed-password.component.html',
    styleUrls: ['./changed-password.component.css'],
    providers: [AuthService, ChangedPasswordService]
})
export class ChangedPasswordComponent implements OnInit, OnDestroy {
    local;
    uname;
    public password;
    public oldpassword;
    public confirmPassword;
    hide = true;
    hide1 = true;
    hide2 = true;
    password_regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[\/\\\!\"#$%&()*+,£^.:;=?\\\\[\\]\\-\'<>~|@_{}]).{8,}$';
    public isInvalid: boolean = false;
    public onChange(event: any): void {
      this.isInvalid = this.oldpassword == this.password
    }
    public isInvalid2: boolean = false;
    public onChange2(event: any): void {
      this.isInvalid2 = this.password != this.confirmPassword
    }
    public typeValidation: User;
    register: FormGroup;
    login: FormGroup;
    type: FormGroup;
    options: FormGroup;
    endRequest;
    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    constructor(private authService: AuthService, private _nav: Router, private router: Router,private _serv: ChangedPasswordService, private formBuilder: FormBuilder, private seoService: SeoService) {
        if (localStorage.getItem('currentUser')) {
            this.local = localStorage.getItem('currentUser');
            let pars = JSON.parse(this.local);
            this.uname = pars.username
        }
        this.options = formBuilder.group({
            bottom: 0,
            fixed: false,
            top: 0
        });
    }
    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }
    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }
    changedPassword(f:NgForm) {
        if(this.register.value.oldpassword != '' && this.register.value.password != '' && this.register.value.confirmPassword != ''){
            if (this.register.valid && this.register.value.oldpassword != this.register.value.password) {
                this.endRequest = this._serv.user_change_password(this.register.value.oldpassword, this.register.value.password, this.register.value.confirmPassword).subscribe(
                    data => {
                        swal({
                            type: 'success',
                            title: 'Password has been changed successfully',
                            showConfirmButton: false,
                            timer: 1500, width: '512px',
                        })
                        f.resetForm()
                    },
                    error => {
                        swal(
                            '',
                            'Your old password is incorrect',
                            'error'
                        )
                    });
            }
            else {
                this.validateAllFormFields(this.register);
            }   
        }
        else {
            swal({
                type: 'error',
                title: 'Please fill in all the fields',
                showConfirmButton: false,
                timer: 1500, width: '512px',
            })
        }

    }
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
    ngOnInit() {
        window.scroll(0, 0);
        // --------------- SEO Service ---------------
        // setting the page title 
        this.seoService.setTitle('Change Password');

        // Updating Open Graph
        this.seoService.updateOGTitle('Change Password');
        this.seoService.updateOGURL(window.location.href);

        // setting CanonicalURL
        this.seoService.createLinkForCanonicalURL();

        // setting twitter
        this.seoService.updateTwitterTitle('Change Password');

        // --------------- SEO Service End ---------------

        this.register = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            oldpassword: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.pattern(this.password_regex), Validators.minLength(8), Validators.maxLength(100)])],
            confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(100)])],
        }, {
                validator: PasswordValidation.MatchPassword // your validation method
            });
        $('#click_advance').click(function () {
            $("i", this).toggleClass("fa-arrow-left fa-arrow-right");
        });
    }
    logout() {
        this.authService.signOut();
        localStorage.clear();
        swal({
            type: 'success',
            title: 'Successfully Logged out',
            showConfirmButton: false,
            timer: 1500, width: '512px',
        });
        this._nav.navigate(['/']);
    }
    ngOnDestroy() {
    }
}