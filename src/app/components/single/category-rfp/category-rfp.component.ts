import { HomeService } from './../../common/home/home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { CategoryRfpService } from './category-rfp.service';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SharedData } from '../../../services/shared-service';
declare const $: any;
import { PagerService } from '../../../services/paginator.service';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { SeoService } from '../../../services/seoService';
import { MatDialog } from '@angular/material';
import { AdvanceService } from '../../other/advance-search/advance.service';
import { AllRfpsService } from '../../all/all-rfps/all-rfps.service';

@Component({
  selector: 'app-category-rfp',
  templateUrl: './category-rfp.component.html',
  styleUrls: ['./category-rfp.component.css',
    '../../local-style/pagination.css',
    '../../local-style/table-normal.css',
    '../../local-style/products-area.css'
  ],
  providers: [PagerService, SharedData, CategoryRfpService, HomeService, AdvanceService,AllRfpsService]
})
export class CategoryRfpComponent implements OnInit {
  date;
  back() {
    this._location.back();
  }
  check(date) {
    this.date = moment(date, this.formats, true).isValid()
    //    
    return this.date;
  }
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  item;
  cat;
  record: any = [];
  status;
  local;
  uname;
  subscribe;

  constructor(private homeServ: HomeService,private getfile :AllRfpsService, public dialog: MatDialog, private pagerService: PagerService, public _shareData: SharedData, private _nav: Router, private _serv: CategoryRfpService, private route: ActivatedRoute, private _location: Location, private seoService: SeoService, private _adserv: AdvanceService) {
    localStorage.removeItem('member');
  }
  // MatPaginator Inputs
  length = 0;
  pageSize = '50';
  pageSizeOptions = [10, 20, 35, 50];
  pager: any = {};
  sub_categories: any = [];
  // MatPaginator Output
  pageEvent: PageEvent;
  public slideConfig;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  CategorySlider() {

    this.slideConfig = {
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      autoplay: false,
      dots: false,
      prevArrow: '<button class="leftRsBanner">&lt;</button>',
      nextArrow: '<button class="rightRsBanner">&lt;</button>',
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 605,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        }

      ]
    };

  }
  move() {
    this.route.queryParams
      .subscribe(params => {
        this.cat = params.cat
        localStorage.setItem('location', 'category' + this.cat)
      })
  }
  memberonly() {
    this.route.queryParams
      .subscribe(params => {
        this.cat = params.cat
        if (!this.local) {
          this._nav.navigate(['signin']);
          localStorage.setItem('member', 'category' + this.cat)
        }
        else if (!this.subscribe) {
          this._nav.navigate(['pricing']);
          localStorage.setItem('member', 'category' + this.cat)
        }
      })
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
  adminlogin;
  ngOnInit() {
    window.scroll(0, 0);
    window.onscroll = function () { myFunction() };

    var header = document.getElementById("MYHeader");
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
    // if (localStorage.getItem('catpage')) {
    //   var page_num: number = Number(localStorage.getItem('catpage'));
    //   this.setpage(page_num);
    // } else {
      this.setpage(1);
    // }
    // this.setpage(1);
    this.check_login();
    if (localStorage.getItem('currentadmin')) {
      this.adminlogin = localStorage.getItem('currentadmin')
    }

  }
  page(pageSize) {
    if (pageSize) {
      this.pageSize = pageSize;
      // if (localStorage.getItem('pages')) {
      //   var page_num: number = Number(localStorage.getItem('pages'));
      //   this.onPaginateChange(page_num);
      // } else {
        this.setpage(1);
      // }
    }
    else {
      delete this.pageSize;
    }
  }
  setpage(page) {
    localStorage.setItem('catpage', page);
    this.route.queryParams
      .subscribe(params => {
        this.cat = params.cat

        this._adserv.rfpsinglesubcat(params.cat).subscribe(
          data => {
            this.sub_categories = data['sub_categories'];
            this.CategorySlider();
          }
        )

        // --------------- SEO Service ---------------
        // setting the page title 
        this.seoService.setTitle(params.cat);

        // Updating Open Graph
        this.seoService.updateOGTitle(params.cat);
        this.seoService.updateOGURL(window.location.href);

        // setting CanonicalURL
        this.seoService.createLinkForCanonicalURL();

        // setting twitter
        this.seoService.updateTwitterTitle(params.cat);

        // --------------- SEO Service End ---------------

        this._serv.catrfprecord(this.cat, this.pageSize, page).subscribe(
          data => {
            this.record = data['Results'];
            this.item = data['totalItems']
            this.length = this.item;
            this.pager = this.pagerService.getPager(data['totalItems'], page, this.pageSize);
          });
      })
  }
  onPaginateChange(event) {
    const startIndex = event.pageIndex * event.pageSize;
    this._serv.catrfprecord(this.cat, event.pageSize, event.pageIndex + 1).subscribe(
      data => {
        this.record = data['Results'];
        this.item = data['totalItems']
        this.length = this.item;
      });
  }
  single(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  public showPDF(rfpkey,title): void {
    // alert(rfpkey)
    this.getfile.getPDF(rfpkey)
        .subscribe(x => {
          console.log(x)
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
            link.download = title+".pdf";
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
              title: "Oops. There appears to be a problem downloading this file - please contact Customer Support. Available",
              showConfirmButton: true,
              width: '512px',
              confirmButtonColor: "#090200",
            });
          }
        }
        
        );
}
  id;
  doc;
  public trialshowPDF(rfpkey,title): void {
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
            link.download = title+".pdf";
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        } ,
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
          else if(error.status == 406){
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
  check_trial(id,url,title) {
    if (this.subscribe == "Trial Subscription user") {
      this.trialshowPDF(id,title)
        }else if (this.subscribe == "Subscribe user") {
      this._adserv.downloadRfps(id).subscribe(
        data=>{
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
              // this.showPDF(id,title)
  
            },
        error=>{
          if(error.status==403){
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
