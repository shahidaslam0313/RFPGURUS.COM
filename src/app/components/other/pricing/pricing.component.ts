import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PricingService } from './pricing.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { RfpService } from '../../single/single-rfp/rfp.service';
import { PaymentmethodsService } from '../../profile/paymentmethods/paymentmethods.service';
import { Location, NgForOf } from '@angular/common';
import { SeoService } from '../../../services/seoService';
import { FormGroup, Validators, FormControl,FormBuilder, NgForm } from '@angular/forms';
import { SignupService } from '../../Auth/signup/signup.service';
import { HomeService } from '../../common/home/home.service';
declare var $: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricingsteps.component.scss',
  '../../local-style/payment.css',
  '../../local-style/single-pricing.css',
  '../../local-style/cradet-card-box.css'
],
  providers: [PricingService, RfpService]
})
export class PricingComponent implements OnInit {
  @ViewChild('openModal') openModal: ElementRef;
  isfreetrial: boolean = false;
  readonly:boolean=false;

  free() {
    if (localStorage.getItem('currentUser')) {
      this.valuee = "BM";
      this.isfreetrial = true;
      this.Yplan = false;
      this.Mplan = false;
      this.Fplan = true;
      this.planSelected = true;
      this.prv_stepdetail("B", "M");
    }
    else {
      this._nav.navigate(['signin']);
    }
  }
  selectPlan({ value }) {
    if (value == "BM") {
      this.Mplan = true;
      this.Yplan = false;
      this.Fplan = false;
      this.prv_stepdetail("B", "M");
    }
    else if (value == "PY") {
      this.Yplan = true;
      this.Mplan = false;
      this.Fplan = false;
      this.prv_stepdetail("P", "Y");
    }
  }
  payed() {
    if (localStorage.getItem('currentUser')) {
      this.isfreetrial = false;
      $('#exampleModalCenter').modal('hide');
    }
    else {
      this._nav.navigate(['signin']);
    }
  }
  pkgsub = false;
  pkg_detail = {};
  valuee = 'BM';
  CCV: FormGroup;
  CardNumber = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$';
  ExpiryDate = '([0-9]{2}[/]?){2}';
  vin_Data = { city: "", state: "", country: "" };
  Mplan = true;
  Yplan = true;
  Fplan = true;
  planSelected = false;
  form: FormGroup;
  CardNumberForm;
  CardNumberForm2;
  id;
  CardCodeForm;
  CardCodeForm2;
  ExpiryDateForm
  firststep(value) {
    window.scroll(0, 0);
    this.valuee = value;
    if (value == "BM") {
      this.Mplan = true;
      this.Yplan = false;
      this.Fplan = false;
      this.planSelected = true;
      this.prv_stepdetail("B", "M");
    }
    else if (value == "PY") {
      this.Yplan = true;
      this.Mplan = false;
      this.Fplan = false;
      this.planSelected = true;
      this.prv_stepdetail("P", "Y");
    }
  }
  text:any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: "Weeks",
    Days: "Days",
    Hours: "Hrs",
    Minutes: "Mins",
    Seconds: "Secs",
    MilliSeconds: "MilliSeconds"
  };
  prv_stepdetail(type, dur) {
    this.pkg_detail['type'] = type
    this.pkg_detail['dur'] = dur
    this.pkgsub = true;
  }
  constructor(private route: ActivatedRoute, private _serv1: RfpService,private formBuilder: FormBuilder, private _nav: Router, private _serv: PricingService, private _home :HomeService, private _serv2: SignupService, private _http6: PaymentmethodsService, private _location: Location, private seoService: SeoService) {
    this.CardNumberForm=true;
    this.CardNumberForm2=false;
    this.CardCodeForm=true;
    this.CardCodeForm2=false
   }
  ngOnInit() {
    this.getcardid(this.id);
    window.scroll(0, 0);
    this.images();
    this.timer();
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Pricing');

    // Updating Open Graph
    this.seoService.updateOGTitle('Pricing');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Pricing');

    // --------------- SEO Service End ---------------
    this.form = this.formBuilder.group({
      CardNumberForm: [{ value: "", disabled: true }, Validators.compose([Validators.required])],
      CardNumberForm2: [{ value: "", disabled: true }, Validators.compose([Validators.required])],
      CardCodeForm: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(3)])],
      CardCodeForm2: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'),Validators.minLength(4)])],
      ExpiryDateForm: ['', Validators.compose([Validators.required, Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')])],
      city: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      zipcode: ['', Validators.compose([Validators.required, Validators.maxLength(5),
      Validators.pattern('^[0-9]*$')])],
      CardtypeForm: ['', Validators.compose([Validators.required])],
      Holdername: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z _.]+$')])],
      nickname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z _.]+$')])],
      Address: ['', Validators.compose([Validators.required])],
      Carddefault:['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      })
    if (localStorage.getItem('currentUser')) {
      this._home.get_card_infos().subscribe(Data => {
        this.res = Data;
        console.log(this.res,'Saved card')
        if (!this.res.length) {
          this.isright = true;
        }
      })
    }
    if(localStorage.getItem('pricing')=='BM'){
      window.scroll(0, 0);
      this.Mplan = true;
      this.Yplan = false;
      this.Fplan = false;
      this.planSelected = true;
      this.prv_stepdetail("B", "M");
    }
    else if (localStorage.getItem('pricing')=='PY'){
      window.scroll(0, 0);
      this.Yplan = true;
      this.Mplan = false;
      this.Fplan = false;
      this.planSelected = true;
      this.prv_stepdetail("P", "Y");
    }

  }
  totaltime;
  timer(){
    this._home.gettimer().subscribe( data => {
      this.totaltime = data.json();
      // alert(this.totaltime);
      console.log(this.totaltime);
    })
  }
  monthly;
  year;
  priceimages;
  images(){
    this._serv.pricingimage().subscribe(data => {
      this.priceimages = data['free_trial'];
      this.monthly = data['monthly_plan'];
      this.year = data['yearly_plan'];
      
     
    })
  }
  showallplan(){
    this.planSelected = false;
  }
  res;
  status;
  usernameOnly = '[a-zA-Z]+';

  public model: any = {};
  var_get_status; var_get_id;
  card_opeation = [
    { value: 'Visa', viewValue: 'Visa' },
    { value: 'Mastercard', viewValue: 'Master' },
    { value: 'American Express', viewValue: 'American Express' },
    { value: 'Discover', viewValue: 'Discover' }

  ];
  onSelectionChanged({ value }) {
    if (value === 'American Express') {
      this.form.get('CardNumberForm2').enable();
    } else {
      this.form.get('CardNumberForm').enable();
      
    }
  }
  eachcardid;
  setautopay: boolean = true;
  getcardid(id) {
    this.eachcardid = id;
  }
  changed(val) {
    this.setautopay = val.checked
  }
  invalid;
  zipcodeCheck(zipcode1) {
   
    if (zipcode1.length > 4) {
    
      this.endRequest = this._serv2.zipcode(zipcode1).subscribe(
        data => {
          this.model.city = data['city'];
          this.model.state = data['state'];
          this.model.country = data['country'];
          this.readonly=true;
        },
        
        error => {
          error.status== 400
          this.invalid=error.status;
          delete  this.model.city;
          delete  this.model.state;
          delete this.model.country;

        });
    }
  }
  expirydate;
  chek(val) {
    // this.expirydate=val.toString().slice(3,7);
    this.expirydate = val.toString().slice(3, 5);
  }
  public mask = function (rawValue) {

    // add logic to generate your mask array  
    if (rawValue && rawValue.length > 0) {
      if (rawValue[0] == '0' || rawValue[5] == '1') {
        return [/[01]/, /[1-9]/, '/', /[0-9]/, /[0123456789]/];
      } else {
        return [/[01]/, /[0-2]/, '/', /[0-9]/, /[0123456789]/];
      }
    }
    return [/[01]/, /[0-9]/, '/', /[0-9]/, /[0123456789]/];

  }
  endRequest;
  // public ccvmask = [/[0-9]/, /\d/, /\d/];
  public cardmask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  keyPress(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  cardtype
  ShowButton(var_type_atm) {
    this.cardtype = var_type_atm;
    if (var_type_atm == "American Express") {
      this.cardmask = [/[3]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
      this.CardNumberForm = false;
      this.form.controls.CardNumberForm.reset();
      this.CardNumberForm2 = true;
      this.CardCodeForm = false;
      this.form.controls.CardCodeForm.reset();
      this.CardCodeForm2 = true;
    
    }
    else if (var_type_atm == "Visa") {
      this.cardmask = [/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.CardNumberForm2 = false;
      this.form.controls.CardNumberForm2.reset();
      this.CardNumberForm = true;
      this.CardCodeForm2 = false;
      this.form.controls.CardCodeForm2.reset();
      this.CardCodeForm = true;
    }
    else if (var_type_atm == "Mastercard") {
      this.cardmask = [/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.CardNumberForm2 = false;
      this.form.controls.CardNumberForm2.reset();
      this.CardNumberForm = true;
      this.CardCodeForm2 = false;
      this.form.controls.CardCodeForm2.reset();
      this.CardCodeForm = true;
    } else {
      this.cardmask = [/[6]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.CardNumberForm2 = false;
      this.form.controls.CardNumberForm2.reset();
      this.CardNumberForm = true;
      this.CardCodeForm2 = false;
      this.form.controls.CardCodeForm2.reset();
      this.CardCodeForm = true;
    }
  }
  isright: boolean = false;
  set_default: boolean = false;
  Add_new() {
    if (this.set_default == true) {
      this.isright = false;
    } else if (this.set_default == false) {
      this.isright = true;

    }
  }

  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      return false
    }
    else {
      return true
    }
  }

  local;
  uname;
  date;
  default: boolean = false;
  public Cardnumber;
  public Cardnumber2;
  public isInvalid: boolean = false;
  public isInvalid2: boolean = false;
  public change(event: any): void {
    var card = this.model.cardNumber.split('-').join('').split('_').join('').length;
    if (card < 16) {
      this.isInvalid = true;
    }
    else {
      this.isInvalid = false;
    }
  }
  public change2(event: any): void {
    var card = this.model.cardNumber.split('-').join('').split('_').join('').length;
    if ( card < 15) {
      this.isInvalid2 = true;
    }
    else {
      this.isInvalid2 = false;
    }
  }
  proceed(f: NgForm) {
    this.local = localStorage.getItem('currentUser');
    let pars = JSON.parse(this.local);
    this.uname = pars.username
    this.date = this.model.expirationdate;
    // if(this.model.holdername != null && this.model.address != null && this.model.zipcode != null && this.model.city != null && this.model.state != null && this.model.country != null && this.model.cardNumber != null && this.model.cardcod && this.date != null && this.model.cardtype != null &&  this.model.nickname != null ){
      // if(this.form.controls.Holdername.valid && this.form.controls.Address.valid && this.form.controls.zipcode.valid && this.form.controls.city.valid && this.form.controls.state.valid && this.form.controls.country.valid && this.form.controls.CardNumberForm.valid && this.form.controls.CardCodeForm.valid && this.form.controls.CardtypeForm.valid && this.form.controls.nickname.valid){
        if (this.isfreetrial == true) {
          if (this.isright == true) {
                if(this.model.holdername != null && this.model.address != null && this.model.zipcode != null  && this.model.cardNumber != null && this.model.cardcod && this.date != null && this.model.cardtype != null &&  this.model.nickname != null ){
      if(this.form.controls.Holdername.valid && this.form.controls.Address.valid && this.form.controls.zipcode.valid && this.form.controls.city.valid && this.form.controls.state.valid && this.form.controls.country.valid && this.form.controls.CardNumberForm.valid || this.form.controls.CardNumberForm2.valid && this.form.controls.CardCodeForm.valid || this.form.controls.CardCodeForm2.valid && this.form.controls.CardtypeForm.valid && this.form.controls.nickname.valid){
        if(this.isInvalid==false && this.isInvalid2==false){
          this._http6.addCard(this.model.holdername, this.model.address, this.model.zipcode, this.model.city, this.model.state, this.model.country, this.model.cardNumber.split('-').join(''), this.model.cardcod, this.date.split('/').join(''), this.model.cardtype, this.setautopay, this.model.nickname).subscribe(Data => {
    
            this.model.defaultcard = Data.id
            if (Data.id) {
              this._serv.package_free_trial(this.isright, this.model.defaultcard, this.model.expirationdate, this.model.cardcod, this.var_get_id, this.model.cardtype, this.model.holdername, this.pkg_detail['type'], this.pkg_detail['dur'])
                .subscribe(data => {
                  swal(
                    'Your payment is posted successfully.',
                    '',
                    'success'
                  )
                  this._nav.navigate(['purchase-history'])
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
                    else {
                      this._nav.navigate([url]);
                    }
                  } else {
                    this._nav.navigate(['/']);
                  }
                
                  f.resetForm()
                  this._nav.navigate(['purchase-history'])
                },
              
                  error => {
                    if (error.status == 500) {
                      swal(
                        'Oops',
                        'Internal server error',
                        'error'
                      )
                    }
                    else if (error.status == 404) {
                      swal(
                        'You have already subscribed for free trial',
                        '',
                        'error'
                      )
                    }
                    else if (error.status == 403) {
                      swal(
                        'You have already subscribed',
                        '',
                        'error'
                      )
                    }
                    else if (error.status == 400) {
                      swal(
                        'Sorry',
                        'Select payment card and subscription plan first',
                        'error'
                      )
                    }
                  });
            }
            else {
              swal(
                'Oops',
                'Something went wrong Please Try Again',
                'error'
              )
            }
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
          })
        }
        else {
          swal({
            type: 'error',
            title: 'Invalid details',
            showConfirmButton: false,
            timer: 1500, width: '512px',
          })
        }     
      }
      else {
        swal({
          type: 'error',
          title: 'Invalid details',
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
            // f.resetForm()
          } else if (this.isright == false) {
            this._serv.package_free_trial(this.isright, this.eachcardid, this.model.expirationdate, this.model.cardcod, this.var_get_id, this.model.cardtype, this.model.holdername, this.pkg_detail['type'], this.pkg_detail['dur'])
              .subscribe(data => {
                swal(
                  'Your payment has been transferred',
                  '',
                  'success'
                )
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
                  else {
                    this._nav.navigate([url]);
                  }
                } else {
                  this._nav.navigate(['/']);
                }
                f.resetForm()
                this._nav.navigate(['purchase-history'])
              },
                error => {
                  if (error.status == 500) {
                    swal(
                      'Oops',
                      'Internal server error',
                      'error'
                    )
                  }
                  else if (error.status == 404) {
                    swal(
                      'You have already subscribed for free trial',
                      '',
                      'error'
                    )
                  }
                  else if (error.status == 403) {
                    swal(
                      'You have already subscribed',
                      '',
                      'error'
                    )
                  }
                  else if (error.status == 200) {
                    swal(
                      'Your payment has been transferred',
                      '',
                      'success'
                    )
                  }
                  else if (error.status == 400) {
                    swal(
                      'Sorry',
                      'Select payment card and subscription plan first',
                      'error'
                    )
                  }
                });
          }
        } else {
          if (this.isright == true) {
            if(this.model.holdername != null && this.model.address != null && this.model.zipcode != null && this.model.cardNumber != null && this.model.cardcod && this.date != null && this.model.cardtype != null &&  this.model.nickname != null ){
              if(this.form.controls.Holdername.valid && this.form.controls.Address.valid && this.form.controls.zipcode.valid && this.form.controls.city.valid && this.form.controls.state.valid && this.form.controls.country.valid && this.form.controls.CardNumberForm.valid || this.form.controls.CardNumberForm2.valid && this.form.controls.CardCodeForm.valid || this.form.controls.CardCodeForm2.valid && this.form.controls.CardtypeForm.valid && this.form.controls.nickname.valid){
                if(this.isInvalid == false && this.isInvalid2==false){
                  this._http6.addCard( this.model.holdername, this.model.address, this.model.zipcode, this.model.city, this.model.state, this.model.country, this.model.cardNumber.split('-').join(''), this.model.cardcod, this.date.split('/').join(''), this.model.cardtype, this.setautopay, this.model.nickname).subscribe(Data => {
    
                    this.model.defaultcard = Data.id
                    if (Data.id) {
                      this._serv.package_free(this.isright, this.model.defaultcard, this.model.expirationdate, this.model.cardcod, this.var_get_id, this.model.cardtype, this.model.holdername, this.pkg_detail['type'], this.pkg_detail['dur']).subscribe(
                        data => {
                          swal(
                            'Your payment has been transferred',
                            '',
                            'success'
                          )
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
                            else {
                              this._nav.navigate([url]);
                            }
                          } else {
                            this._nav.navigate(['/']);
                          }
                          f.resetForm()
                          this._nav.navigate(['purchase-history'])
                        },
                        error => {
                          if (error.status == 403) {
                            swal(
                              'You have already subscribed',
                              '',
                              'error'
                            )
                          }
                          // swal(
                          //   'Oops',
                          //   'Something went wrong',
                          //   'error'
                          // )
                        });
                    }
                    //  else {
                    //   swal(
                    //     'Oops',
                    //     'Something went wrong Please Try Again.',
                    //     'error'
                    //   )
                    // }
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
                  })
                }
                else {
                  swal({
                    type: 'error',
                    title: 'Invalid detail',
                    showConfirmButton: false,
                    timer: 1500, width: '512px',
                  })
                }
          }
            else {
              swal({
                type: 'error',
                title: 'Invalid detail',
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
          } else if (this.isright == false) {
            this._serv.package_free(this.isright, this.eachcardid, this.model.expirationdate, this.model.cardcod, this.var_get_id, this.model.cardtype, this.model.holdername, this.pkg_detail['type'], this.pkg_detail['dur']).subscribe(
              data => {
                swal(
                  'Your payment has been transferred',
                  '',
                  'success'
                )
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
                  else {
                    this._nav.navigate([url]);
                  }
                } else {
                  this._nav.navigate(['/']);
                }
                f.resetForm()
                this._nav.navigate(['purchase-history'])
              },
    
              error => {
                if (error.status == 500) {
                  swal(
                    'Oops',
                    'Internal server error',
                    'error'
                  )
                }
                else if (error.status == 404) {
                  swal(
                    'You have already subscribed for free trial',
                    '',
                    'error'
                  )
                }
                else if (error.status == 400) {
                  swal(
                    'Sorry',
                    'Select payment card and subscription plan first',
                    'error'
                  )
                }
                else if(error.status==403){
                  swal(
                    'Sorry',
                    'You have already subscribed',
                    'info'
                  )
                }
              });
          }
      }
      
      // }
      // else {
      //   swal({
      //     type: 'error',
      //     title: 'Invalid detail',
      //     showConfirmButton: false,
      //     timer: 1500, width: '512px',
      //   })
      // }
      // }
     
    // else {
    //   swal({
    //     type: 'error',
    //     title: ' Please fill in all the fields ',
    //     showConfirmButton: false,
    //     timer: 1500, width: '512px',
    //   })
    // }
f.resetForm()
  }
  ngOnDestroy() {
    $('#exampleModalCenter').modal('hide');
  }
}
