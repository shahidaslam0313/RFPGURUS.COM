import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SigninService } from './signin.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ViewChild } from '@angular/core';
import { RecapchaComponent } from '../recapcha/recapcha.component';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import * as jwt_decode from "jwt-decode";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
import { Location } from '@angular/common';
import { RecapchaService } from '../recapcha/recapcha.service';
import { SeoService } from '../../../services/seoService';
import { JwtHelper } from 'angular2-jwt';

declare interface ValidatorFn {
  (c: AbstractControl): {
    [key: string]: any;
  };
}
declare interface User {
  username?: string; // required, must be 5-8 characters
  email?: string; // required, must be valid email format
  password?: string; // required, value must be equal to confirm password.
  confirmPassword?: string; // required, value must be equal to password.
  number?: number; // required, value must be equal to password.
  url?: string;
  idSource?: string;
  idDestination?: string;
  optionsCheckboxes?: boolean;
  status?: boolean;
}
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  @ViewChild(RecapchaComponent) captcha: RecapchaComponent;
  jwtHelper: JwtHelper = new JwtHelper();
  endRequest;
  hide = true;
  public typeValidation: User;
  register: FormGroup;
  login: FormGroup;
  type: FormGroup;
  isequal;
  private loggedIn: boolean;
  user: any;
  public logedin: any = 0;
  returnUrl: string;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private _nav: Router, private signinService: SigninService, private formBuilder: FormBuilder, private _location: Location, public recapcha: RecapchaService, private seoService: SeoService) { }

  // ----------------------------- social login
  socialCallBack = (user) => {
    this.user = user;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    if (user) {
      const createUser = this.http.post('https://apis.rfpgurus.com/social_login/', {
        user
      }, { headers: headers })
      // createUser.subscribe((data: Response) => {
        // let user = { userid: jwt_decode(data.json()['token']).user_id, username: jwt_decode(data.json()['token']).username, token: data.json()['token'] };
        createUser.subscribe(data => {
          let user = { 
           userid: this.jwtHelper.decodeToken(data['token']).user_id,
           username: this.jwtHelper.decodeToken(data['token']).username, 
           token: data['token'] };
        if (user && user.token) {
          localStorage.setItem('loged_in', '1');
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        swal({
          type: 'success',
          title: 'You have successfully logged into RFPGurus - The largest aggregator of RFPs at the Federal, County, City, State, Agency levels.',
          showConfirmButton: false,
          timer: 2500, width: '512px',
        });
        // this._location.back();
        if (localStorage.getItem('member')) {
          let url = localStorage.getItem('member')
          let last = url.length
          let ur = url.slice(0, 13)
          let state = url.slice(0, 5)
          let category = url.slice(0, 8)
          let agency = url.slice(0, 6)


          if (ur == 'searched-data') { this._nav.navigate([ur], { queryParams: { keyword: url.slice(13, last) } }); }
          else if (state == 'state') {
            this._nav.navigate([state], { queryParams: { state: url.slice(5, last) } });
          }
          else if (category == 'category') {
            this._nav.navigate([category], { queryParams: { cat: url.slice(8, last) } });
          }
          else if (agency == 'agency') {

            this._nav.navigate([agency], { queryParams: { agency: url.slice(6, last) } });
          }
          else if (url == 'advanced-search') {
            this._nav.navigate([url]);
          }
          else if (url == 'latest-rfps') {
            this._nav.navigate([url]);
          }
          else {
            var val = 'rfp/' + url
            this._nav.navigate([val]);
          }
        } else {
          this._nav.navigate(['/']);
        }

      },
        error => {
          swal(
            'Invalid',
            'Something went wrong',
            'error'
          )
        })
    }
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(this.socialCallBack);
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(this.socialCallBack);
  }
  signOut(): void {
    this.authService.signOut();
  }

  // --------------------------------- end 

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }
  resolved(captchaResponse: string) {
  }
  onLogin() {
    if (this.login.valid && this.recapcha.check()) {
      this.isequal = true;
      this.signinService.login_authenticate(this.login.value.username).subscribe(
        data => {
          this.signinService.login(this.login.value.username, this.login.value.password).subscribe(
            data => {
              swal({
                type: 'success',
                title: 'You have successfully logged into RFPGurus - The largest aggregator of RFPs at the Federal, County, City, State, Agency levels.',
                showConfirmButton: false,
                timer: 1500, width: '512px',
              });

              if (localStorage.getItem('member')) {
                let url = localStorage.getItem('member')
                let last = url.length
                let ur = url.slice(0, 13)
                let state = url.slice(0, 5)
                let category = url.slice(0, 8)
                let agency = url.slice(0, 6)


                if (ur == 'searched-data') { this._nav.navigate([ur], { queryParams: { keyword: url.slice(13, last) } }); }
                else if (state == 'state') {

                  this._nav.navigate([state], { queryParams: { state: url.slice(5, last) } });
                }
                else if (category == 'category') {
                  this._nav.navigate([category], { queryParams: { cat: url.slice(8, last) } });
                }
                else if (agency == 'agency') {

                  this._nav.navigate([agency], { queryParams: { agency: url.slice(6, last) } });
                }
                else if (url == 'advanced-search') {
                  this._nav.navigate([url]);
                }
                else if (url == 'latest-rfps') {
                  this._nav.navigate([url]);
                }
                else {
                  // var val = 'rfp/' + url
                  // this._nav.navigate([val]);
                this._nav.navigate(['rfp/'], { queryParams: { query: url } });
                }
              } else {
                this._nav.navigate(['/']);
              }
              // this._location.back();
            },
            error => {
              this.captcha.resetImg();
              swal(
                'Invalid',
                'Username or Password',
                'error'
              )
            });
        },
        error => {
          if (error.status == 400) {
            swal(
              'Error',
              'First, verify your email address to signin',
              'error'
            )
          }
          else if (error.status == 500) {
            this.captcha.resetImg();
            swal(
              'Error',
              'User does not exist',
              'error'
            )
          }
        }
      );
    }
    else {
      this.validateAllFormFields(this.login);
      this.captcha.resetImg();
      // this.captcha.reset();
      // this.isequal = false;

      swal({
        type: 'error',
        title: 'Please confirm that you are not a robot',
        showConfirmButton: false,
        width: '512px',
        timer: 2000
      });
    }
  }
  foremail() {
    swal({
      title: 'Forgot Password',
      html: ' Enter your email address to receive a link allowing you to reset your password. First, verify your email address to signin',
      input: 'email',
      confirmButtonColor: "#000", width: '512px',
      inputPlaceholder: 'Email'
    }).then((email) => {
      this.forgetPassword(email)
    })
  }
  forgetPassword(pass) {
    this.signinService.forget_password(pass).subscribe(
      data => {
        swal({
          type: 'success',
          html: 'Password reset instructions have been sent to your email. ',
          width: '512px',
        })
      },
      error => {
        swal(
          'Invalid email ',
          'Or User does not exist',
          'error'
        )
      }
    )
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
  trik; encryptSecretKey;
  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Signin');

    // Updating Open Graph
    this.seoService.updateOGTitle('Signin');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Signin');

    // --------------- SEO Service End ---------------

    if (isPlatformBrowser(this.platformId)) {
      this.logedin = localStorage.getItem('loged_in');
      // alert(this.logedin)
    }
    if (this.logedin == 1) {
      this._nav.navigate(['/']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.login = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }
}