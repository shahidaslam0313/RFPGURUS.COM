import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentmethodsService } from './paymentmethods.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Subscription';
import { SignupService } from "../../Auth/signup/signup.service";
import { SeoService } from 'src/app/services/seoService';
import { PricingService } from '../../other/pricing/pricing.service';
import { HomeService } from '../../common/home/home.service';
import { Alert } from 'selenium-webdriver';
import { DISABLED } from '@angular/forms/src/model';

export interface card_opeation {
  value: string;
  viewValue: string;
}
export class errorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
declare interface ValidatorFn {
  (c: AbstractControl): {
    [key: string]: any;
  };
}
@Component({
  selector: 'app-paymentmethods',
  templateUrl: './paymentmethods.component.html',
  styleUrls: ['./paymentmethods.component.scss',
    '../../local-style/payment.css',
    '../../local-style/cradet-card-box.css'
  ],
  // providers: [RegisterService,PaymentmethodsService]
})
export class PaymentmethodsComponent implements OnInit, OnDestroy {
  var_type_atm = new FormControl('');
  cardtype;
  public show: boolean = false;
  check_value: boolean = false;
  ccv1: boolean = false;
  card_opeation = [
    { value: 'Visa', viewValue: 'Visa Card' },
    { value: 'Mastercard', viewValue: 'Master Card' },
    { value: 'AmericanExpress', viewValue: 'American Express' },
    { value: 'Discover', viewValue: 'Discover' }

  ];
  model: any = {};
  public buttonName: any = 'Show';
  expirydate;
  public show2: boolean = false
  endRequest; msg;
  public cardsmask ;
 
  // = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  chek(val) {
    this.expirydate = val.toString().slice(3, 5);
  }
  public mask = function (rawValue) {

    if (rawValue && rawValue.length > 0) {
      if (rawValue[0] == '0' || rawValue[5] == '1') {
        return [/[01]/, /[1-9]/, '/', /[0-9]/, /[0123456789]/];
      } else {
        return [/[01]/, /[0-2]/, '/', /[0-9]/, /[0123456789]/];
      }
    }
    return [/[01]/, /[0-9]/, '/', /[0-9]/, /[0123456789]/];

  }
  cardexist: boolean = false;

  private productsSource;
  currentProducts;
  ccv2;
  form: FormGroup;
  form2: FormGroup;

  cardnumber2;
  var_box_check: boolean = false;
  destroy_value;
  public cardmask;
  //  public cardsmask;
  // vin_Data = { "city": "", "state": "" };
  vin_Data = { city: "", state: "", country: "" };
  private sub: Subscription;
  flipclass = 'credit-card-box';
  constructor(private pricingServ: PricingService, private _home: HomeService, private formBuilder: FormBuilder, private _nav: Router, private serv: PaymentmethodsService, private router: Router, private route: ActivatedRoute, private signupServ: SignupService, private seoService: SeoService) {
    this.cardnumber = true;
    this.cardnumber2 = false;
    this.ccv = true;
    this.ccv2 = false;
  }
  ShowButton(var_type_atm, f: NgForm) {
    this.cardtype = var_type_atm;
    if (var_type_atm == "AmericanExpress") {
      this.cardmask = [/[3]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
      this.cardnumber = false;
      this.cardnumber2 = true;
      this.ccv = false;
      this.form.controls.ccv.reset();
      this.ccv2 = true;
    }
    else if (var_type_atm == "Visa") {
      this.cardsmask = [/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardnumber2 = false;
      this.cardnumber = true;
      this.ccv2 = false;
      this.form.controls.ccv2.reset();
      this.ccv = true;
    }
    else if (var_type_atm == "Mastercard") {
      this.cardsmask = [/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardnumber2 = false;
      this.cardnumber = true;
      this.ccv2 = false;
      this.form.controls.ccv2.reset();
      this.ccv = true;
    } else {
      this.cardsmask = [/[6]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardnumber2 = false;
      this.cardnumber = true;
      this.ccv2 = false;
      this.form.controls.ccv2.reset();
      this.ccv = true;
    }
  }
  invalid;
  zipcodeCheck(zipcode1) {
    if (zipcode1.length > 4) {
      this.endRequest = this.signupServ.zipcode(zipcode1).subscribe(
        data => {
          // this.form.controls['city'].setValue(data['city']);
          // this.form.controls['state'].setValue(data['state']);
          // this.form.controls['country'].setValue(data['country']);
          this.model.city = data['city'];
          this.model.state = data['state'];
          this.model.country = data['country'];
        },
        error => {
          error.status == 400
          this.invalid = error.status;
          delete this.model.city;
          delete this.model.state;
          delete this.model.country;

        }
      );
    }
  }
  updefault;

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  resolved(captchaResponse: string) {
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
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
    this.seoService.setTitle('Payment Methods');

    // Updating Open Graph
    this.seoService.updateOGTitle('Payment Methods');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Payment Methods');

    // --------------- SEO Service End ---------------

    this.getCards();
    this.form = this.formBuilder.group({
      cardnumber: [{ value: "", disabled: true }, Validators.compose([Validators.required])],
      cardnumber2: [{ value: "", disabled: true }, Validators.compose([Validators.required])],
      ccv: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      ccv2: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      expirydate: ['', Validators.compose([Validators.required, Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')])],
      city: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      zip: ['', Validators.compose([Validators.required, Validators.maxLength(5),Validators.minLength(5),
      Validators.pattern('^[0-9]*$')])],
      cardnickname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z _.]+$')])],
      nickname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z _.]+$')])],
      address: ['', Validators.compose([Validators.required])],
      // setautopay: ['',[Validators.required]],
      state: ['', Validators.compose([Validators.required])],


      // var_type_atm:['', Validators.compose([Validators.required])],
    });
    this.form2 = this.formBuilder.group({

      var_type_atm: ['', Validators.compose([Validators.required])],
    });
  }
  onSelectionChanged({ value }) {
    if (value === 'AmericanExpress') {
      this.form.get('cardnumber2').enable();
    } else {
      this.form.get('cardnumber').enable();
      
    }
  }
  cardid = "";
  card;
  default: boolean = false;
  cardtypeclear;
  name;
  cardnumber;
  ccv;
  address;
  zip;
  city;
  state;
  country;
  id;
  setautopay: boolean = true;
  payauto: boolean = true;
  autopay;
  get(id, name, number, cvc, expDate, street_address, zipcode, city, state, country, autopay) {
    this.id = id;
    this.name = name;
    this.cardnumber = number;
    this.ccv = cvc;
    this.expirydate = expDate;
    // this.pin = pinCode;
    this.address = street_address;
    this.zip = zipcode;
    this.city = city;
    this.state = state;
    this.country = country;
    // this.updefault = status;
    this.autopay = autopay;
  }
  keyPress(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  deleteSingleCard(id) {
    swal({
      title: 'Are you sure you want to delete this card? <br> You will not be able to revert this',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result == true) {

        this.serv.deleteCard(id).subscribe(Data => {
          swal({
            type: 'success',
            title: 'Credit card is deleted',
            showConfirmButton: false,
            timer: 1500, width: '512px',
          })
          this.getCards();
        },
          error => {
            if (error.status == 204) {
              swal({
                type: 'error',
                title: 'No Credit Card Found',
                showConfirmButton: false,
                timer: 1500, width: '512px',
              })
            }
            else if (error.status == 500) {
              swal(
                'Sorry',
                'Server Is Under Maintenance',
                'error'
              )
            }
            else {
              swal(
                'Sorry',
                'Some Thing Went Worrng',
                'error'
              )
            }
          })
      }
    })
  }
  date;
  changed(val) {
    this.setautopay = val.checked
  }
  public Cardnumber;
  public Cardnumber2;
  public isInvalid: boolean = false;
  public isInvalid2: boolean = false;
  public change(event: any): void {
    var card = this.model.Cardnumber.split('-').join('').split('_').join('').length;
    if (card < 16) {
      this.isInvalid = true;
    }
    else {
      this.isInvalid = false;
    }
  }
  public change2(event: any): void {
    var card2 = this.model.Cardnumber2.split('-').join('').split('_').join('').length;
    if (card2 < 15) {
      this.isInvalid2 = true;
    }
    else {
      this.isInvalid2 = false;
    }
  }
  public removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }

  check_value_get: boolean = false;
  add(f: NgForm) {
    this.date = this.form.value['expirydate'];

    if (this.cardtype == "AmericanExpress") {
      if (this.model.cardType!= null && this.form.controls.cardnickname.value != null && this.form.controls.cardnumber2.value != null && this.form.controls.ccv2.value != null
        && this.form.controls.expirydate.value != null && this.form.controls.address.value != null && this.form.controls.zip.value != null
        && this.form.controls.nickname.value != null) {

        if (this.form.controls.cardnickname.valid && this.isInvalid2 == false && this.form.controls.ccv2.valid
          && this.form.controls.expirydate.valid && this.form.controls.address.valid && this.form.controls.zip.valid
          && this.form.controls.city.valid && this.form.controls.state.valid && this.form.controls.country.valid  && this.form.controls.nickname.valid) {
          this.serv.addCard(
            // this.default, 
            this.form.value['cardnickname'],
            this.form.value['address'],
            this.form.value['zip'],
            this.form.value['city'],
            this.form.value['state'],
            this.form.value['country'],
            this.form.value['cardnumber2'].split('-').join(''),
            this.form.value['ccv2'],
            this.date.split('/').join(''),
            this.cardtype,
            // this.form.value['setautopay'],
            this.setautopay,
            this.form.value['nickname']).subscribe(Data => {
              swal({
                type: 'success',
                title: 'Payment Method has been added successfully',
                showConfirmButton: false,
                timer: 1500, width: '512px',
              })
              this.cardtypeclear = " ";
              this.getCards();
              f.resetForm();
              delete this.model.cardType
            },
              error => {
                if (error.status == 406) {
                  swal({
                    type: 'error',
                    title: 'Card Number already exist',
                    showConfirmButton: false,
                    timer: 1500, width: '512px',
                  })
                }
              })
        }

        else {
          swal({
            type: 'error',
            title: 'Invalid Details',
            showConfirmButton: false,
            timer: 1500, width: '512px',
          })
        }
      }

      else {
        swal({
          type: 'error',
          title: ' Please fill in all the fields ',
          showConfirmButton: false,
          timer: 1500, width: '512px',
        })
      }
    }
    else {
      if (this.model.cardType!= null && this.form.controls.cardnickname.value != null && this.form.controls.cardnumber.value != null && this.form.controls.ccv.value != null
        && this.form.controls.expirydate.value != null && this.form.controls.address.value != null && this.form.controls.zip.value != null && this.form.controls.nickname.value != null) {
        if (this.form.controls.cardnickname.valid && this.isInvalid == false && this.form.controls.ccv.valid && this.form.controls.nickname.valid
          && this.form.controls.expirydate.valid && this.form.controls.address.valid && this.form.controls.zip.valid
          && this.form.controls.city.valid && this.form.controls.state.valid && this.form.controls.country.valid) {
          this.endRequest = this.serv.addCard(this.form.value['cardnickname'], this.form.value['address'], this.form.value['zip'], this.form.value['city'], this.form.value['state'], this.form.value['country'], this.form.value['cardnumber'].split('-').join(''), this.form.value['ccv'], this.date.split('/').join(''), this.cardtype, 
          // this.form.value['setautopay'], 
          this.setautopay,
          this.form.value['nickname']).subscribe(Data => {
            swal({
              type: 'success',
              title: 'Payment Method has been added successfully',
              showConfirmButton: false,
              timer: 1500, width: '512px',
            });
            this.getCards();
            f.resetForm();
            // this.cardtypeclear=" ";
            delete this.model.cardType


          },
            error => {
              if (error.status === 406) {
                swal({
                  type: 'error',
                  title: 'Card Number already exist',
                  showConfirmButton: false,
                  timer: 1500, width: '512px',
                })
              }
              else if(error.status === 405){
                swal({
                  type: 'error',
                  title: 'Card details are not valid',
                  showConfirmButton: false,
                  timer: 1500, width: '512px',
                })
              }
            }
            )
        }
        else {
          swal({
            type: 'error',
            title: 'Invalid Details',
            showConfirmButton: false,
            timer: 1500, width: '512px',
          })
        }
      }
      else {
        swal({
          type: 'error',
          title: ' Please fill in all the fields ',
          showConfirmButton: false,
          timer: 1500, width: '512px',
        })
      }
    }

  }
  res;
  message;
  getCards() {
    this.endRequest = this._home.get_card_infos().subscribe(Data => {
      // this.endRequest = this.pricingServ.get_card_info().subscribe(Data => {
      this.res = Data;
      this.message = Data['message'];
    },
      error => {
        if (error.status == 404) {
          swal({
            type: 'error',
            title: 'Credit Card Not Found',
            showConfirmButton: false,
            timer: 1500, width: '512px',
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server Is Under Maintenance',
            'error'
          )
        }
      })
  }
  exist_card(card1) {
    this.serv.Atm_card_exist(card1).subscribe(
      data => {
      },
      error => {
        if (error.status == 302) {
          this.cardexist = true;
        }
      }
    );

  }
  ngOnDestroy() {
  }
}