import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../services/main.service'
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from "angular4-social-login";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SeoService } from '../../../services/seoService';
import { HomeService } from '../../common/home/home.service';

declare const $: any;
@Component({
    selector: 'app-purchase-history',
    templateUrl: './purchase-history.component.html',
    styleUrls: ['./purchase-history.component.scss',
    '../../local-style/single-pricing.css'

  ],
    providers: [AuthService, MainService]
})
export class PurchaseHistoryComponent implements OnInit {

    captureScreen() {
        var data = document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {
            // Few necessary setting options  
            var imgWidth = 208;
            var pageHeight = 295;
            // var imgHeight=200;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('Invoice.pdf'); // Generated PDF   
        });

    }
    record = {};
    endRequest;
    nofound: boolean = false;
    pkgList = {};
    result: boolean = false;
    today: number = Date.now();
    pkg_detail = {};
    pkgsub = false;
    public mask = [/\d/, /\d/, /\d/, /\d/];
    public mask1 = [/[a-zA-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/];
    cardnumber1;
    cardnumber2;
    cardnumber3;
    cardnumber4;
    cardholdername;
    expmonth;
    options: FormGroup;
    expyear;
    ccv;
    local;
    uname;
    plan;
    flipclass = 'credit-card-box';
    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    constructor(private _serv1: HomeService, private authService: AuthService, private _nav: Router, private datePipe: DatePipe, private formBuilder: FormBuilder, private _serv: MainService, private seoService: SeoService) {

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

    userdetail;
    valuee = '';
    firststep(value) {
        this.valuee = value;
        if (value == "BM") {
            this.prv_stepdetail("B", "M")
            this._nav.navigate(['pricing'], { queryParams: { value } });
            // localStorage.setitem('pricing',this.valuee)
            localStorage.setItem('pricing', 'BM');
        }
        else if (value == "PY") {
            this.prv_stepdetail("P", "Y")
            this._nav.navigate(['pricing'], { queryParams: { value } });
            localStorage.setItem('pricing', 'PY');
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
    pay;
    end;
    get(pay_date, end_date) {
        this.pay = pay_date;
        this.end = end_date
    }
    trial;
    mainFunction() {
        if (localStorage.getItem('currentUser')) {
            this.local = localStorage.getItem('currentUser');
            let pars = JSON.parse(this.local);
            this.uname = pars.username
            this._serv1.usersubscribe(this.uname).subscribe(
                data => {
                    if (data['Response'] == "Subscribe user") {
                        this._serv.purchaseHistory().subscribe(
                            data => {
                                this.record = data;
                                this.pkgList = data['pkg_fk'];
                                this.result = true;

                                var date = new Date();
                                this.userdetail = data['reg_fk'];
                                var currentDate = this.datePipe.transform(date, "yyyy-MM-dd").toString()
                            },
                            error => {
                                this.nofound = true;
                            })

                    } else if (data['Response'] == "Trial Subscription user") {
                        this._serv.trialHistory().subscribe(
                            data => {
                                // this.nofound=false;
                                this.trial = data;
                            }, error => {


                                this.nofound = true;

                            })
                    } else {
                        this.nofound = true;
                        // alert(this.nofound)
                    }
                },
                error => {
                    this.nofound = true;
                    // alert(this.nofound)
                });
        }

    }
    deactive() {
        this._serv.deactivetrial().subscribe(
            data => {
                if (data['message'] == 'Your trail subscription is deactivated') {
                    swal(
                        'Your Trail Subscription is deactivated',
                        '',
                        'success'
                    )
                    let url = '/';
                    this._nav.navigate([url]);
                }
                else {
                    swal(
                        'You are not activated for free trail',
                        '',
                        'error'
                    )
                }
            })
    }
    next_stepdetail(event: any) {

        if (event.target.value == "BM") {
            this.prv_stepdetail("B", "M")

        } else if (event.target.value == "PY") {
            this.prv_stepdetail("P", "Y")
        }
    }
    prv_stepdetail(type, dur) {
        this.pkg_detail['type'] = type
        this.pkg_detail['dur'] = dur
        this.pkgsub = true;
    }
    proceed() {

        this.pkg_detail['credit'] = this.cardnumber1 + this.cardnumber2 +
            this.cardnumber3 + this.cardnumber4
        this.pkg_detail['ccv'] = this.ccv
        this.pkg_detail['expdate'] = this.expmonth + '/' + this.expyear
        this.endRequest = this._serv.packageUpdate(this.pkg_detail).subscribe(
            data => {
                swal(
                    'Your payment has been transferred',
                    '',
                    'success'
                )
                let url = 'find-rfps';
                this._nav.navigate([url]);
            },
            error => {
                swal(
                    'Oops...',
                    'Something went wrong',
                    'error'
                )
            });
    }
    ngOnInit() {
        window.scroll(0, 0);
        // --------------- SEO Service ---------------
        // setting the page title 
        this.seoService.setTitle('Purchase History');

        // Updating Open Graph
        this.seoService.updateOGTitle('Purchase History');
        this.seoService.updateOGURL(window.location.href);

        // setting CanonicalURL
        this.seoService.createLinkForCanonicalURL();

        // setting twitter
        this.seoService.updateTwitterTitle('Purchase History');

        // --------------- SEO Service End ---------------

        this.mainFunction()
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

}