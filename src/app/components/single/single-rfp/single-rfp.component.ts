import { AdvanceService } from './../../other/advance-search/advance.service';
import { HomeService } from './../../common/home/home.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';
import { RfpService } from './rfp.service';
import swal from 'sweetalert2';
import 'rxjs/Rx';
import { SharedData } from '../../../services/shared-service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { SeoService } from '../../../services/seoService';
import { AllRfpsService } from '../../all/all-rfps/all-rfps.service';

@Component({
  selector: 'app-data-table-cmp',
  templateUrl: 'single-rfp.component.html',
  styleUrls: ['./single-rfp.component.css',
    '../../local-style/table-normal.css',
    '../../local-style/products-area.css'
  ]
})

export class SingleRfpComponent implements OnInit {
  date;
  check(date) {

    this.date = moment(date, this.formats, true).isValid()
    //    
    return this.date;
  }
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  rfpid: string;
  id;
  record;
  statuss;
  local;
  uname;
  subscribe;
  currentUser;
  wrfp;
  constructor(private advanceServ: AdvanceService,
    private getfile: AllRfpsService, private homeServ: HomeService, public dialog: MatDialog, private _nav: Router, public _shareData: SharedData, private route: ActivatedRoute, private _serv: RfpService, private seoService: SeoService, ) {
    localStorage.removeItem('member');
  }
  back() {
    if (localStorage.getItem('location')) {
      let url = localStorage.getItem('location')
      let last = url.length
      let ur = url.slice(0, 13)
      let state = url.slice(0, 5)
      let category = url.slice(0, 8)
      let agency = url.slice(0, 6)
      let subcategory = url.slice(0, 11)

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
      else if (subcategory == 'subcategory') {
        this._nav.navigate([subcategory], { queryParams: { subcat: url.slice(11, last) } });
      }
      else if (url == 'admin-panel') {
        this._nav.navigate([url]);
      }
      else if (url == 'find-rfps') {
        this._nav.navigate(['find-rfps']);
      }
      else {
        this._nav.navigate([url]);
      }

    }
    else {
      this._nav.navigate(['/']);
    }

  }
  status: boolean = false;
  navbarClass() {
    this.status = !this.status;
  }

  download(info) {
    this._serv.downloadFile(info).subscribe(
      data => {
        if (data['status'] = "200") {
          swal(
            'File Downloaded Successfully',
            '',
            'success'
          )
        }
      });
  }
  memberonly() {
    this.route.queryParams
      .subscribe(params => {
        if (!this.local) {
          this._nav.navigate(['pricing']);
          this.rfpid = params['query'];
          localStorage.setItem('member', this.rfpid);
        }
        else if (!this.subscribe) {
          this._nav.navigate(['pricing']);
          this.rfpid = params['query'];
          localStorage.setItem('member', this.rfpid);
        }

      })
  }

  adminlogin;
  ngOnInit() {
    window.scroll(0, 0);
    if (localStorage.getItem('currentadmin')) {
      this.adminlogin = localStorage.getItem('currentadmin')
    }
    this._shareData.currentMessage.subscribe(message => this.wrfp = message)
    this._shareData.currentMessagetotal.subscribe(message => this.total = message)
    this.route.queryParams
      .subscribe(params => {

        // --------------- SEO Service ---------------
        // setting the page title 
        this.seoService.setTitle(params['query']);

        // Updating Open Graph
        this.seoService.updateOGTitle(params['query']);
        this.seoService.updateOGURL(window.location.href);

        // setting CanonicalURL
        this.seoService.createLinkForCanonicalURL();

        // setting twitter
        this.seoService.updateTwitterTitle(params['query']);

        this.seoService.updateTwitterTitle('rfp bid sites,rfp bidding sites, bid sites, rfp usa, government rfp website, rfp consulting firm, rfp consulting firm in dallas, rfp project management, rfp project management services, rfp search engine, rfp project management services, rfp proposal, rfp consulting, government rfp, digital marketing rfp, rfp management, website rfp example, rfp services, rfp for audit services, agency rfp, best rfp software, data management rfp, energy efficiency rfp, rfp for property management services, energy storage rfp, rfp business, rfp contract terms, rfp government bids, government rfp search, rfp aggregator, best rfp database, rfp database, government rfp database, rfp sites, rfp online, find rfp, find rfp bid sites, find rfp bid, find rfp bids, Government Request for Proposal, rfp search, rfp process, marketing rfp database, architectural rfp database, architectural design bids, bid finder, government bids, government contracts, contract bidding websites, construction bidding websites, best construction bid sites, free rfp bid sites, public rfp database')

        // --------------- SEO Service End ---------------


        this.rfpid = params['query'];

        this._serv.rfprecord(this.rfpid, params.model).subscribe(
          data => {
            this.record = data;
            this.id = data[0].id
          });
      })

    this.check_login()

  }
  public showPDF(rfpkey, title): void {
    // alert(rfpkey)
    this.getfile.getPDF(rfpkey)
      .subscribe(x => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: "application/pdf" });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = title + ".pdf";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      },
        error => {
          if (error.status == 400) {
            swal({
              type: 'error',
              title: "Oops. There appears to be a problem downloading this file - please contact Customer Support. Available ",
              showConfirmButton: true,
              width: '512px',
              confirmButtonColor: "#090200",
            });
          }
        }

      );
  }
  total;
  watchlist() {
    if (localStorage.getItem('currentUser')) {
      this._serv.postWatchlist(this.id).subscribe(

        data => {
          this.statuss = data.message;
          this.wrfp = data['result'];
          this.total = data.total
          //  this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
          if (!data['message'] && data['result']) {
            this._shareData.watchtotal(this.total);
            this._shareData.watchInfo(this.wrfp);
          }
          if (this.statuss == "This Rfp is already in your Watch List") {
            swal({
              type: 'info',
              title: 'This RFP is already in your Watch List ',
              showConfirmButton: true,
              confirmButtonColor: "#090200",
              width: '512px',

            });
          }
          else {
            swal({
              type: 'success',
              title: 'RFP successfully added to your Watch List',
              showConfirmButton: true,
              confirmButtonColor: "#090200",
              width: '512px',
            });
          }
        });
    }
    else {
      swal({
        type: 'error',
        title: 'Please Login with RFPGurus',
        showConfirmButton: true,
        width: '512px',
        confirmButtonColor: "#090200",
      });

      this.route.queryParams
        .subscribe(params => {
          //   console.log(params); // {order: "popular"}

          this._nav.navigate(['signin']);
          this.rfpid = params['query'];
          localStorage.setItem('member', this.rfpid);
        });

    }
  }
  doc;
  public trialshowPDF(rfpkey, title): void {
    // alert(rfpkey)
    this.getfile.trialgetPDF(rfpkey)
      .subscribe(x => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: "application/pdf" });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = title + ".pdf";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      },
        error => {
          if (error.status == 400) {
            swal({
              type: 'error',
              title: "Bad request",
              showConfirmButton: true,
              width: '512px',
              confirmButtonColor: "#090200",
            });
          }
          else if (error.status == 403) {
            swal({
              type: 'error',
              title: "You have already downloaded 05 documents",
              showConfirmButton: true,
              width: '512px',
              confirmButtonColor: "#090200",
            });
          }
          else if (error.status == 406) {
            swal({
              type: 'error',
              title: "Your free trial has been expired",
              showConfirmButton: true,
              width: '512px',
              confirmButtonColor: "#090200",
            });
          }
        }
      );
  }
  public showzip(rfpkey,title): void {
    // alert(rfpkey)
    this.getfile.getPDF(rfpkey)
        .subscribe(x => {
            // It is necessary to create a new blob object with mime-type explicitly set
            // otherwise only Chrome works like it should
            var newBlob = new Blob([x], { type: "application/zip" });
  
            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }
  
            // For other browsers: 
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);
  
            var link = document.createElement('a');
            link.href = data;
            link.download = title+".zip";
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  
            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        }
        ,
        error => {
          if (error.status == 400) {
            swal({
              type: 'error',
              title: "Oops. There appears to be a problem downloading this file - please contact Customer Support.",
              showConfirmButton: true,
              width: '512px',
              confirmButtonColor: "#090200",
            });
          }
        }
        
        );
  }
  check_trial(id, url, title) {
    if (this.subscribe == "Trial Subscription user") {
      this.trialshowPDF(id, title)
    }
    else if (this.subscribe == "Subscribe user") {
      this.advanceServ.downloadRfps(id).subscribe(
        data => {
          if (data.content_type == "pdf"){
            // window.open(url, '_blank');
            this.showPDF(id,title);
        }else if(data.content_type == "zip"){
          this.showzip(id,title);
        }else if ( data.message == "PDF not Available"){
          swal({
            type: 'error',
            title: "Oops. There appears to be a problem downloading this file - please contact Customer Support",
            showConfirmButton: true,
            width: '512px',
            confirmButtonColor: "#090200",
          });
        }
          // window.open(url, '_blank');
          // this.showPDF(id, title);
        },
        error => {
          if (error.status == 403) {
            swal({
              type: 'error',
              title: "Your RFP documents download limit has been exceeded",
              showConfirmButton: true,
              width: '512px',
              confirmButtonColor: "#090200",
            });
          }
        }
      )
    }
  }
  check_login() {
    if (localStorage.getItem('currentadmin')) {
      this.subscribe = localStorage.getItem('currentadmin')
    }
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      this.homeServ.usersubscribe(this.uname).subscribe(
        data => {
          if (data['Response'] == "Subscribe user" || data['Response'] == "Trial Subscription user") {
            this.subscribe = data['Response']
            return false
          }
        });
    }
    else {
      return true
    }
  }
}
