import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import { Http } from '@angular/http';
import swal from 'sweetalert2';
import { ForgetPasswordService } from './forget-password.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from './meta_service';
// import { MetaService } from './service/meta_service';

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
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  providers: [ForgetPasswordService]
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  public typeValidation: User;
  register: FormGroup;
  login: FormGroup;
  hide=true;
  hide1 =true;
  type: FormGroup;
  endRequest;
  model: any = {};
  param;
  code;
  password_regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[\/\\\!\"#$%&()*+,£^.:;=?\\\\[\\]\\-\'<>~|@_{}]).{8,}$';

  constructor(private formBuilder: FormBuilder, private _serv: ForgetPasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private http5: Http,private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL(); this.metaService.metacreateCanonicalURL();}
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }
  onForget() {
    if (this.register.valid) {
      this.endRequest = this._serv.change_password(this.register.value.password, this.register.value.confirmPassword, this.code).subscribe(
        data => {
          swal({
            type: 'success',
            title: 'Your Password has been successfully changed',
            showConfirmButton: false,
            timer: 1500,width: '512px',
          })
          let url = 'signin';
          this.router.navigate([url]);
        },
        error => { });
    } else {
      this.validateAllFormFields(this.register);
    }
  }
  checkChange(){
    // alert(this.code);
    this._serv.checkUse(this.code).subscribe(
      data =>{
      },
      error =>{
        if(error.status== 400){
          swal({
            type: 'error',
            title: 'You have already used this link',
            showConfirmButton: false,
            timer: 1500, width: '512px',
          })
          this.router.navigate(['/signin'])
        }
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
  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'Forget Password | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'Forget Password | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Forget Password |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    this.endRequest = this.param = this.route.params.subscribe(params => {
      this.code = params['query2'];
      this.checkChange();
    });
    this.register = this.formBuilder.group({
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.password_regex), Validators.minLength(8), Validators.maxLength(100)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(100)])],
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }
  ngOnDestroy() {
  }
}