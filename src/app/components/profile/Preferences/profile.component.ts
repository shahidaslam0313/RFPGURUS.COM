import { HomeService } from './../../common/home/home.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';
import { ProfileService } from '../profile/profile.service';
import { Router } from '@angular/router';
import { MainService } from '../../../services/main.service';
import { DatePipe } from '@angular/common';
import { AuthService } from "angular4-social-login";
import { AdvanceService } from '../../other/advance-search/advance.service';
import { SeoService } from 'src/app/services/seoService';
import { SignupService } from '../../Auth/signup/signup.service';
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
    // firstname?: string;
}
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [AdvanceService, AuthService, ProfileService, MainService, SignupService, HomeService]
})
export class ProfileComponent implements OnInit, OnDestroy {

    catess = new FormControl();
    cities = new FormControl();
    agencies = new FormControl();
    counties = new FormControl();
    states = new FormControl();
    selectedValue: string;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    valueSelected(preference, status) {
        if (preference == "") {
            this.tempUserPreference.splice(status, 1);
        }
    }
    valueSelected1(preference, status) {
        if (preference != "") {
            // this.tempstatePreference.push(preference.toString());
            this.endRequest = this._adserv.rfpcounty(this.tempstatePreference).subscribe(
                data => {
                    this.county = data[0];
                }
            )
            this.endRequest = this._adserv.rfpagency(this.tempstatePreference).subscribe(
                data => {
                    this.agency = data[0];
                }
            )

        } else if (preference == "") {
            this.tempstatePreference.splice(status, 1);
            this.endRequest = this._adserv.rfpcounty(this.tempstatePreference).subscribe(
                data => {
                    this.county = data[0];
                    console.log(data[0])
                }
            )
            this.endRequest = this._adserv.rfpagency(this.tempstatePreference).subscribe(
                data => {
                    this.agency = data[0];
                    console.log(data[0])
                }
            )
        }
    }
    valueSelected2(preference, status) {
        if (preference == "") {
            this.tempcityPreference.splice(status, 1);
        }
    }
    valueSelected3(preference, status) {
        if (preference != "") {
            // this.tempcountyPreference.push(preference.toString());
            this.endRequest = this._adserv.rfpcity(this.tempcountyPreference).subscribe(
                data => {
                    this.city = data[0];
                }
            )
        }
        else if (preference == "") {
            this.tempcountyPreference.splice(status, 1);
            this.endRequest = this._adserv.rfpcity(this.tempcountyPreference).subscribe(
                data => {
                    this.city = data[0];
                }
            )
        }
    }
    valueSelected4(preference, status) {
        if (preference == "") {
            this.tempagencyPreference.splice(status, 1);
        }
    }
    remove(preference, index) {
        this.tempUserPreference.splice(index, 1);
    }
    remove1(preference, index: number) {
        this.tempstatePreference.splice(index, 1);
        this.endRequest = this._adserv.rfpcounty(this.tempstatePreference).subscribe(
            data => {
                this.county = data[0];
            }
        )
        this.endRequest = this._adserv.rfpagency(this.tempstatePreference).subscribe(
            data => {
                this.agency = data[0];
            }
        )

    }
    remove2(preference, index: number) {
        this.tempcityPreference.splice(index, 1);
    }
    remove3(preference, index: number) {
        this.tempcountyPreference.splice(index, 1);
        this.endRequest = this._adserv.rfpcity(this.tempcountyPreference).subscribe(
            data => {
                this.city = data[0];
            })
    }
    remove4(preference, index: number) {
        this.tempagencyPreference.splice(index, 1);
    }
    endRequest;
    today: number = Date.now();
    UserPreference: any = [];
    tempUserPreference: any = [];
    tempstatePreference: any = [];
    statePreference: any = [];
    tempcityPreference: any = [];
    cityPreference: any = [];
    tempcountyPreference: any = [];
    countyPreference: any = [];
    tempagencyPreference: any = [];
    agencyPreference: any = [];
    record;
    result: boolean = false;
    public typeValidation: User;
    register: FormGroup;
    emailVerify: FormGroup;
    login: FormGroup;
    type: FormGroup;
    pkgsub = false;
    profile: any = [];
    personal: any = [];
    local;
    options: FormGroup;
    cat: any = [];
    city: any = [];
    state: any = [];
    county: any = [];
    agency: any = [];

    uname;
    usernameexist;
    vin_Data = { "city": "", "state": "" };
    emailexist;
    digitsOnly = '^[0-9,-]+$';

    public phoneMask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    constructor(private homeServ: HomeService, private signupServ: SignupService, private authService: AuthService, private _nav: Router, private _serv: ProfileService, private datePipe: DatePipe, private formBuilder: FormBuilder, private _adserv: AdvanceService, private _ser: MainService, private seoService: SeoService) {
        if (localStorage.getItem('currentUser')) {
            this.local = localStorage.getItem('currentUser');
            let pars = JSON.parse(this.local);
            this.uname = pars.username
            this.endRequest = this._serv.get_preferances(this.uname).subscribe(
                data => {
                    this.personal = data;
                    if (data['user_preference'] == null) {
                        this.UserPreference = [];
                    } else {
                        this.UserPreference = data['user_preference'];
                        this.tempUserPreference = this.UserPreference;
                    }
                    if (data['state_preference'] == null) {
                        this.statePreference = [];
                    } else {
                        this.statePreference = data['state_preference'];
                        this.tempstatePreference = this.statePreference;
                        this.endRequest = this._adserv.rfpcounty(this.tempstatePreference).subscribe(
                            data => {
                                this.county = data[0];
                                // console.log(data[0])
                            }
                        )
                        this.endRequest = this._adserv.rfpagency(this.tempstatePreference).subscribe(
                            data => {
                                this.agency = data[0];
                                // console.log(data[0].JSON)
                            }
                        )
                    }
                    if (data['county_preference'] == null) {
                        this.countyPreference = [];
                    } else {
                        this.countyPreference = data['county_preference'];
                        this.tempcountyPreference = this.countyPreference;
                        this.endRequest = this._adserv.rfpcity(this.tempcountyPreference).subscribe(
                            data => {
                                this.city = data[0];
                            }
                        )
                    }
                    if (data['city_preference'] == null) {
                        this.cityPreference = [];
                    } else {
                        this.cityPreference = data['city_preference'];
                        this.tempcityPreference = this.cityPreference;
                    }

                    if (data['agency_preference'] == null) {
                        this.agencyPreference = [];
                    } else {
                        this.agencyPreference = data['agency_preference'];
                        this.tempagencyPreference = this.agencyPreference;
                    }
                });
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
    zipcodeCheck(zipcode1) {
        if (zipcode1.length > 4) {
            this.endRequest = this.signupServ.zipcode(zipcode1).subscribe(
                data => {
                    this.personal['city'] = data['city']
                    this.personal['state'] = data['state']
                    this.personal['country'] = data['country']
                });
        }
    }
    usernameCheck(username1) {
        this.endRequest = this.signupServ.username_exist(username1).subscribe
            (
                data => {
                    this.usernameexist = data;
                }
            );
    }
    emailCheck(email1) {
        this.endRequest = this.signupServ.email_exist(email1).subscribe
            (
                data => {
                    this.emailexist = data;
                });
    }
    onRegister() {

        let nulllist;
        let nullcounty;
        let nullagency;
        let nullstate;
        let nullcity;
        this.UserPreference = this.tempUserPreference;
        if (this.UserPreference.length == 0) {
            nulllist = null
            // alert(this.UserPreference)
        }
        this.statePreference = this.tempstatePreference
        if (this.statePreference.length == 0) {
            nullstate = null
        }
        this.countyPreference = this.tempcountyPreference
        if (this.countyPreference.length == 0) {
            nullcounty = null
        }
        this.cityPreference = this.tempcityPreference
        if (this.cityPreference.length == 0) {
            nullcity = null
        }
        this.agencyPreference = this.tempagencyPreference
        if (this.agencyPreference.length == 0) {
            nullagency = null
        }
        this.endRequest = this._serv.peraferanceUpdate(this.register.value, this.UserPreference, this.statePreference, this.countyPreference, this.cityPreference, this.agencyPreference).subscribe(
            data => {
                console.log(this.register.value, this.UserPreference, this.statePreference, this.countyPreference, this.cityPreference, this.agencyPreference)
                swal({
                    type: 'success',
                    title: ' Your RFP preferences have been updated successfully ',
                    showConfirmButton: false,
                    timer: 1500, width: '512px',
                })
            });

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
    mainFunction() {
        this.endRequest = this._ser.purchaseHistory().subscribe(
            data => {
                this.record = data;
                this.result = true;
                var enddate = this.record[0].end_date.toString();
                var date = new Date();
                var currentDate = this.datePipe.transform(date, "yyyy-MM-dd").toString()
                if (enddate <= currentDate && this.record[0].is_paid == true) {
                    this.endRequest = this._ser.expirePackage(enddate).subscribe(data => {
                        if (data == true) {
                            this.record[0].is_paid = false;
                            swal(
                                'Subscription',
                                'Your package has been expired.',
                                'success'
                            )
                        }
                    })
                }
            })
    }
    ngOnInit() {
        window.scroll(0, 0);

        // --------------- SEO Service ---------------
        // setting the page title 
        this.seoService.setTitle('RFP Preferences');

        // Updating Open Graph
        this.seoService.updateOGTitle('RFP Preferences');
        this.seoService.updateOGURL(window.location.href);

        // setting CanonicalURL
        this.seoService.createLinkForCanonicalURL();

        // setting twitter
        this.seoService.updateTwitterTitle('RFP Preferences');

        // --------------- SEO Service End ---------------

        this.emailVerify = this.formBuilder.group({
            code: ['', Validators.required]
        });
        this.register = this.formBuilder.group({
            // firstname: ['', Validators.compose([Validators.required])],
            // lastname: ['', Validators.compose([Validators.required])],
            // companyname: ['', Validators.compose([Validators.required])],
            // address: ['', Validators.compose([Validators.required])],
            // username: ['', Validators.required],
            // zipcode: ['', Validators.compose([Validators.required])],
            // city: ['', Validators.compose([Validators.required])],
            // country: ['', Validators.compose([Validators.required])],
            // state: ['', Validators.compose([Validators.required])],
            // phone: ['', Validators.compose([Validators.required])],
            newsletter: ['', Validators.required],
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            email: [{ value: '', disabled: true }, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            // optionsCheckboxes: ['', Validators.required],
            // password: ['', Validators.required],
            // confirmPassword: ['', Validators.required],
        },
        );
        this.endRequest = this.homeServ.rfpcategory().subscribe(
            data => {
                this.cat = data;
            }
        )
        this.endRequest = this.homeServ.rfpstate().subscribe(
            data => {
                this.state = data['Result'];
            })


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
        // this.endRequest.unsubscribe();
    }
}