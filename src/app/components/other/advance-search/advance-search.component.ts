import { FilterSidebarService } from './../filter-sidebar/filter-sidebar.service';
import { HomeService } from './../../common/home/home.service';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AdvanceService } from './advance.service';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
// import {DatePipe} from '@angular/common';
declare var $: any;
import { HeaderService } from '../../common/header/header.service';
import { SpeechRecognitionService } from '../../common/header/speechservice';
import { SharedData } from '../../../services/shared-service';
import { PagerService } from '../../../services/paginator.service';
// import { DateFormat } from './date-format';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { SeoService } from '../../../services/seoService';
import { MatDialog } from '@angular/material';
import { AllRfpsService } from '../../all/all-rfps/all-rfps.service';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css',
    '../../local-style/pagination.css',
    '../../local-style/table-normal.css',
    '../../local-style/products-area.css'
  ],
  providers: [PagerService, AdvanceService, SharedData, HeaderService, SpeechRecognitionService, HomeService,AllRfpsService]
})
export class AdvanceSearchComponent implements OnInit, OnDestroy {
  public blink = false;
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  date;
  @Output() spokenText = new EventEmitter<string>();
  @Output() error = new EventEmitter<string>();
  @Input() showInput = true;
  check(date) {

    this.date = moment(date, this.formats, true).isValid()

    return this.date;


  }
  adminlogin;
  endRequest;
  pager: any = {};
  state: any = [];
  cat: any = [];
  agency: any = [];
  startIndex;
  catValue = '';
  stateValue = '';
  category;
  stateval;
  item;
  posted = '';
  enter;
  record: any = [];
  local;
  uname;
  subscribe;
  search: boolean = false;
  enterdate;
  duedate;
  states;
  agencies;
  cates;
  subcate;
  status;
  catsearch;
  agensearch;
  statsearch;
  postedDate;
  DueDate;
  subcatsearch;
  rfpid: string;
  id;
  foods = [
    { value: 'active', viewValue: 'Active' },
    { value: 'expire', viewValue: 'Expired' },
    { value: 'all', viewValue: 'All' }
  ];
  datashow: boolean = false;
  filtertext;
  constructor(private filterServ: FilterSidebarService, private homeServ: HomeService, private datePipe: DatePipe, private speech: SpeechRecognitionService, public _shareData: SharedData, private _serv1: HeaderService, private pagerService: PagerService, private route: ActivatedRoute, private _nav: Router, private _serv: AdvanceService,
    private getfile :AllRfpsService, private _location: Location, private seoService: SeoService, public dialog: MatDialog) {
    localStorage.removeItem('member');
    if (localStorage.getItem('statuss')) {
      this.status = localStorage.getItem('statuss');
    }
    if (localStorage.getItem('enterdates')) { this.enterdate = localStorage.getItem('enterdates') }
    if (localStorage.getItem('duedates')) { this.duedate = localStorage.getItem('duedates') }
    if (localStorage.getItem('statess')) {
      this.states = localStorage.getItem('statess');
    }
    if (localStorage.getItem('agenciess')) { this.agencies = localStorage.getItem('agenciess') }
    if (localStorage.getItem('catess')) { this.cates = localStorage.getItem('catess') }
    if (localStorage.getItem('subcats')) { this.subcate = localStorage.getItem('subcats') }
    if (localStorage.getItem('submissionto')) { this.submissionto = localStorage.getItem('submissionto') }
    if (localStorage.getItem('submissionfrom')) { this.submissionfrom = localStorage.getItem('submissionfrom') }
  }
  move() {
    localStorage.setItem('location', 'advanced-search')
    if (this.status) {
      localStorage.setItem('statuss', this.status)
    }
    if (this.enterdate) { localStorage.setItem('enterdates', this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.duedate) { localStorage.setItem('duedates', this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.submissionto) { localStorage.setItem('submissionto', this.datePipe.transform(this.submissionto, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.submissionfrom) { localStorage.setItem('submissionfrom', this.datePipe.transform(this.submissionfrom, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.states) { localStorage.setItem('statess', this.states) }
    if (this.agencies) { localStorage.setItem('agenciess', this.agencies) }
    if (this.cates) { localStorage.setItem('catess', this.cates) }
    if (this.subcate) { localStorage.setItem('subcats', this.subcate) }

  }
  memberonly() {

    if (!this.local) {
      this._nav.navigate(['signin']);
      localStorage.setItem('member', 'advanced-search');
    }
    else if (!this.subscribe) {
      this._nav.navigate(['pricing']);
      localStorage.setItem('member', 'advanced-search');

    }
  }
  // MatPaginator Inputs
  length = 0;
  // click = 1;

  pageSize = '10';
  pageSizeOptions = [10, 20, 35, 50];
  Rfpnum;
  title;
  // MatPaginator Output
  pageEvent: PageEvent;
  download(info) {
    this.endRequest = this._serv.downloadFile(info).subscribe(
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
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  posted_date() {
    this.enter = this.posted
  }
  cat_value() {
    this.category = this.catValue
  }
  state_value() {
    this.stateval = this.stateValue
  }
  chang(status) {
    this.status = status;
    // this.onSubmit(1);
  }
  public showPDF(rfpkey,title): void {
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
            link.download = title+".pdf";
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
  submission_from;
  submission_to;
  submissionfrom;
  submissionto;
  Submission_to(date) {
    if (date) {
      this.submissionto = moment(date).format('YYYY-MM-DD');
      // this.onSubmit(1);
    }
    else {
      delete this.submissionfrom;
      delete this.submissionto;
      //  this.onSubmit(1);
    }
  }
  Submission_from(date) {
    if (date) {
      this.submissionfrom = moment(date).format('YYYY-MM-DD');
      // this.onSubmit(1);
    }
    else {
      delete this.submissionfrom;
      delete this.submissionto;
      //  this.onSubmit(1);
    }
  }
  entereddate(enterdate) {

    if (enterdate) {
      this.postedDate = moment(enterdate).format('YYYY-MM-DD');
      // this.onSubmit(1);
    }
    else {
      delete this.enterdate;
      delete this.postedDate;
      //  this.onSubmit(1);
    }
  }
  dueddate(duedate) {
    if (duedate) {
      this.DueDate = moment(duedate).format('YYYY-MM-DD');
      // this.onSubmit(1);
    } else {
      delete this.DueDate;
      delete this.duedate;
      //  this.onSubmit(1);
    }

  }
  onSubmit(page) {
    localStorage.setItem('page', page);
    this.route.queryParams
      .subscribe(params => {
        if (this.status == null) {
          delete this.status;
        }
        if (this.Rfpnum || this.title || this.status || this.postedDate || this.DueDate || this.states || this.agencies || this.cates || this.subcate || this.submissionfrom || this.submissionto) {
          this._serv.searchrfprecord(this.Rfpnum, this.title, this.status, this.postedDate, this.DueDate, this.states, this.agencies, this.cates, this.pageSize, page, this.subcate, this.submissionfrom, this.submissionto).subscribe(
            data => {
              this.record = "";

              this.item = "";
              this.record = data['Results'];
              this.item = data['TotalResult'];
              this.length = this.item;
              this.search = true;
              this.pager = this.pagerService.getPager(this.item, page, this.pageSize);
            },
            error => {
              // this.search = true;
              this.datashow = true;
              this.record.splice(0, this.record.length);
              this.length = 0;
            });


        }

        else if (params.state) {

          this.states = params.state;
          this.search = false;

          this._serv.searchrfprecord(this.Rfpnum, this.title, this.status, this.postedDate, this.DueDate, this.states, this.agencies, this.cates, this.pageSize, page, this.subcate, this.submissionfrom, this.submissionto).subscribe(
            data => {
              this.record = "";
              this.item = "";
              this.record = data['Results'];
              this.item = data['TotalResult'];
              this.length = this.item;
              this.search = true;
              this.pager = this.pagerService.getPager(this.item, page, this.pageSize);
            },
            error => {
              this.search = true;
              this.datashow = true;
              this.record.splice(0, this.record.length);
              this.length = 0;
            });
        }
        else {

          this.status = "active";
          this._serv.advancesearch(this.Rfpnum, this.title, this.status, this.postedDate, this.DueDate, this.states, this.agencies, this.cates, this.pageSize, page, this.subcate).subscribe(
            data => {
              this.record = "";
              this.item = "";
              this.record = data['Results'];
              this.item = data['TotalResult'];
              this.length = this.item;
              this.search = true;
              this.pager = this.pagerService.getPager(this.item, page, this.pageSize);
            },
            error => {
              this.search = true;
              this.datashow = true;
              this.record.splice(0, this.record.length);
              this.length = 0;
            });
        }
      })

  }
  page(pageSize) {
    if (pageSize) {
      this.pageSize = pageSize;
      if (localStorage.getItem('page')) {
        var page_num: number = Number(localStorage.getItem('page'));
        this.onSubmit(page_num);
      } else {
        this.onSubmit(1);
      }
    }
    else {
      delete this.pageSize;
    }
  }

  // statsearch;
  formclear() {
    delete this.status;
    this.enterdate = null;
    this.duedate = null;
    delete this.states;
    this.agencies = null;
    this.cates = null;
    this.statsearch= null;
    this.agensearch = null;
    this.catsearch = null;
    this.postedDate = null;
    this.DueDate = null;
   
    localStorage.removeItem('statuss');
    localStorage.removeItem('enterdates');
    localStorage.removeItem('duedates');
    localStorage.removeItem('statess');
    localStorage.removeItem('agenciess');
    localStorage.removeItem('catess');
    localStorage.removeItem('subcats');

    this.endRequest = this.homeServ.rfpstate().subscribe(
      data => {
        this.state = data['Result'];
      },
      error => {
      });
    this.endRequest = this.homeServ.rfpcategory().subscribe(
      data => {
        this.cat = data;
      },
      error => {
      }
    )
    this.endRequest = this.filterServ.agencies().subscribe(
      data => {
        this.agency = data['Result'];
      }
    )
  }
  single(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  query;
  Rfp;
  loaded = false;
  fund(event) {
    this._shareData.catInfo(this.query);
    let requiredUrl = 'searched-data'
    this._nav.navigate([requiredUrl], { queryParams: { keyword: this.query } });
  }
  triggerMike() {
    if (!('webkitSpeechRecognition' in window)) {
    } else {
      this.blink = true;
      this.search1();
    }
  }
  /////////voice to text/////////
  search1(): void {
    this.speech.record().subscribe((text) => {
      this.query = text;
      this.blink = false;
      this.spokenText.emit(this.query);
      this.speech.stop();
    },
    );
  }
  filter(query) {
    if (this.query !== "") {
      this._serv1.searchSuggestions(this.query).subscribe(response => {
        this.Rfp = response['results'];
        this.loaded = true;
      });
    }
  }
  sub_categories: any = [];
  select_state() {
    if (this.states) {
      localStorage.removeItem('agenciess');
      localStorage.removeItem('catess');
      localStorage.removeItem('subcats');
      delete this.agencies
      delete this.cates;
      delete this.subcate;
    }
    if (this.states == 'all') {

    } else {
      this._serv.dropdown(this.states, this.agencies, this.cates, this.subcate).subscribe(
        data => {
          if (data['States']) {
            this.state = data['States'];
            
          }
          if (data['Categories']) {
            this.cat = data['Categories'];
          }
          if (data['Agencies']) {
            this.agency = data['Agencies'];

          }
          if (data['Sub_categories_list']) {
            this.sub_categories = data['Sub_categories_list'];
            console.log(this.sub_categories);
          }

        })
    }

  }
  select_agency() {
    if (this.agencies) {
      delete this.cates;
      delete this.subcate;
      localStorage.removeItem('catess');
      localStorage.removeItem('subcats');
    }
    if (this.agencies != 'all') {
      this._serv.dropdown(this.states, this.agencies, this.cates, this.subcate).subscribe(
        data => {
          console.log(data);
          if (data['States']) {
            this.state = data['States'];

          }
          if (data['Categories']) {
            this.cat = data['Categories'];
          }
          if (data['Agencies']) {
            this.agency = data['Agencies'];

          }
          if (data['Sub_categories_list']) {
            this.sub_categories = data['Sub_categories_list'];
            console.log(this.sub_categories);
          }

        })
    }


  }
  select_category() {
    this.subcate=null;
    this._serv.dropdown(this.states, this.agencies, this.cates, this.subcate).subscribe(
      data => {
        if (data['States']) {
          this.state = data['States'];

        }
        if (data['Categories']) {
          this.cat = data['Categories'];
        }
        if (data['Agencies']) {
          this.agency = data['Agencies'];

        }
        if (data['Sub_categories_list']) { this.sub_categories = data['Sub_categories_list']; }
       
      })
      this.subcate=null;

      
  }


  ngOnInit() {
    window.scroll(0, 0);
    window.onscroll = function () { myFunction() };
  
    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {   
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
    // localStorage.clear();
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Advanced Search');

    // Updating Open Graph
    this.seoService.updateOGTitle('Advanced Search');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Advanced Search');

    // --------------- SEO Service End ---------------

    if (localStorage.getItem('currentadmin')) {
      this.adminlogin = localStorage.getItem('currentadmin')
    }

    // this.onPaginateChange(1);
    if (localStorage.getItem('page')) {
      var page_num: number = Number(localStorage.getItem('page'));
      this.onSubmit(page_num);
    }
    else {
      this.onSubmit(1);
    }

    this.endRequest = this.homeServ.rfpstate().subscribe(
      data => {
        this.state = data['Result'];
      });
    this.endRequest = this.homeServ.rfpcategory().subscribe(
      data => {
        this.cat = data;
      });
    this.endRequest = this.filterServ.agencies().subscribe(
      data => {
        this.agency = data['Result'];
      });
    this.check_login();
    $("#box").click(function () {
      $("#box").toggleClass("animation-blink");
    });

  }
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
  doc;
  downloadrfp(id,url,title){
    if (this.subscribe == "Trial Subscription user") {
      this.trialshowPDF(id,title)
      }
   
   else if (this.subscribe == "Subscribe user") {
    this._serv.downloadRfps(id).subscribe(
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

        },
        error => {

        });
    }
    else {
      return true
    }
  }
 
  ngOnDestroy() {
    // this.endRequest.unsubscribe();
  }
}