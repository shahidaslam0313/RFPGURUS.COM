import { HomeService } from './../../common/home/home.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PagerService } from '../../../services/paginator.service';
import * as moment from 'moment';
import { AdvanceService } from '../advance-search/advance.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SeoService } from 'src/app/services/seoService';

@Component({
  selector: 'app-find-rfp',
  templateUrl: './find-rfp.component.html',
  styleUrls: ['./find-rfp.component.css',
  '../../local-style/pagination.css',
  '../../local-style/sh-n-table.css'
],
  providers: [PagerService, AdvanceService, HomeService]
})
export class FindRfpComponent implements OnInit, OnDestroy {
  
  data;
  state;
  pager: any = {};
  date;
  
  check(date) {

    this.date = moment(date, this.formats, true).isValid()

    return this.date;


  }
  move() {
    localStorage.setItem('location', 'find-rfps')
    if (this.status) {
      localStorage.setItem('status', this.status)
    }
    if (this.enterdate) { localStorage.setItem('enterdate', this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.duedate) { localStorage.setItem('duedate', this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.states) { localStorage.setItem('states', this.states) }
    if (this.agencies) { localStorage.setItem('agencies', this.agencies) }
    if (this.cates) { localStorage.setItem('cates', this.cates) }
    if (this.subcates) { localStorage.setItem('subcat', this.subcates) }
    if (this.submission_from) { localStorage.setItem('submission_from', this.datePipe.transform(this.submission_from, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.submission_to) { localStorage.setItem('submission_to', this.datePipe.transform(this.submission_to, "yyyy-MM-dd h:mm:ss a ")) }
  }
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  onUserRowSelect(event): void {
    this.data = event.data.seoTitleUrl;
    let sth = 'rfp/' + this.data;
    this._nav.navigate([sth]);

  }

  items;
  public cat;
  pageSize = '15';
  settings: any;
  duedate;
  enterdate;
  states;
  cates;
  title;
  Rfpnum;
  status;
  agencies;
  item;
  length;
  catsearch;
  statsearch;
  search = false;
  subcates;
  submission_from;
  submission_to;
  statesearch;
  constructor(private homeServ: HomeService, private datePipe: DatePipe, private route: ActivatedRoute, private _adserv: AdvanceService, private pagerService: PagerService, private http: HttpClient, private _nav: Router, private seoService: SeoService) { }

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
    this.route.queryParams
      .subscribe(params => {
        // this.CatName = params['CatName'] || '0';
        // this.cates = params['cat']
        // alert(params['cat'])
      
        this.statsearch=null
        this.catsearch=null
        this.subcates=null
        // this.=null
        if (localStorage.getItem('status')) {
          this.status = localStorage.getItem('status');
        } else if (localStorage.getItem('status') == null) {
          delete this.status;
          
        }
        if (localStorage.getItem('enterdate')) { this.enterdate = localStorage.getItem('enterdate') } else if (localStorage.getItem('enterdate') == null) {
          delete this.enterdate;
          
        }
        if (localStorage.getItem('duedate')) { this.duedate = localStorage.getItem('duedate') }
        else if (localStorage.getItem('duedate') == null) {
          delete this.duedate;
          
        }
        if (localStorage.getItem('submission_from')) { this.submission_from = localStorage.getItem('submission_from') } else if (localStorage.getItem('submission_from') == null) {
          delete this.submission_from;
        }
        if (localStorage.getItem('submission_to')) { this.submission_to = localStorage.getItem('submission_to') }
        else if (localStorage.getItem('submission_to') == null) {
          delete this.submission_to;
        }
        if (localStorage.getItem('states')) {
        
          this.states = localStorage.getItem('states');
         
        }
        else if (localStorage.getItem('states') == null) {
         
          delete this.states;
         }
        if (localStorage.getItem('agencies')) { 
        
          this.agencies = localStorage.getItem('agencies') }
        else if (localStorage.getItem('agencies') == null) {
          delete this.agencies;
        }
        if (localStorage.getItem('cates')) {
         
           this.cates = localStorage.getItem('cates') 
        }
        else if (localStorage.getItem('cates') == null) {
          delete this.cates;
         
        }
        if (localStorage.getItem('subcat')) { this.subcates = localStorage.getItem('subcat') }
        else if (localStorage.getItem('subcat') == null) {
          delete this.subcates;
         
        }
        if (localStorage.getItem('pages')) {
       
          var page_num: number = Number(localStorage.getItem('pages'));
          this.onPaginateChange(page_num);
          
        } else {
         
          this.onPaginateChange(1);
        }
         
      })


    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Find RFPs');

    // Updating Open Graph
    this.seoService.updateOGTitle('Find RFPs');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Find RFPs');

    // --------------- SEO Service End ---------------

    this.homeServ.rfpcategory().subscribe(
      data => {
        this.cat = data
      })
    this.homeServ.rfpstate().subscribe(
      data => {
        this.state = data['Result']
      })
  }
  singlerfp(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  page(pageSize) {
    if (pageSize) {
      this.pageSize = pageSize;
      if (localStorage.getItem('pages')) {
        var page_num: number = Number(localStorage.getItem('pages'));
        this.onPaginateChange(page_num);
      } else {
        this.onPaginateChange(1);
      }
    }
    else {
      delete this.pageSize;
    }
  }
 

  changestate(states) {

    this.states = states;
    localStorage.setItem('states', this.states)
    if (localStorage.getItem('pages')) {
      var page_num: number = Number(localStorage.getItem('pages'));
      this.onPaginateChange(page_num);
    } else {
      this.onPaginateChange(1);
    }
  }
  changecates(cates) {
    this.cates = cates;
    localStorage.setItem('cates', this.cates)
    if (localStorage.getItem('pages')) {
      var page_num: number = Number(localStorage.getItem('pages'));
      this.onPaginateChange(page_num);
    } else {
      this.onPaginateChange(1);
    }
  }
  changeduedate(submission_from) {
    this.submission_from = moment(submission_from).format('YYYY-MM-DD');
    localStorage.setItem('submission_from', moment(submission_from).format('YYYY-MM-DD'))
    if (localStorage.getItem('pages')) {
      var page_num: number = Number(localStorage.getItem('pages'));
      this.onPaginateChange(page_num);
    } else {
      this.onPaginateChange(1);
    }
  }
  changeenterdate(enterdate) {
    this.enterdate = moment(enterdate).format('YYYY-MM-DD');
    localStorage.setItem('enterdate', moment(enterdate).format('YYYY-MM-DD'))
    if (localStorage.getItem('pages')) {
      var page_num: number = Number(localStorage.getItem('pages'));
      this.onPaginateChange(page_num);
    } else {
      this.onPaginateChange(1);
    }
  }
  changeagencies(agencies) {
    this.agencies = agencies;
    localStorage.setItem('agencies', this.agencies)
    if (localStorage.getItem('pages')) {
      var page_num: number = Number(localStorage.getItem('pages'));
      this.onPaginateChange(page_num);
    } else {
      this.onPaginateChange(1);
    }
  }
  onPaginateChange(page) {
    localStorage.setItem('pages', page);
    if (this.states == null) {
      delete this.states
    } if (this.cates == null) {
      delete this.cates
    }
    if (this.submission_to == null) {
      delete this.submission_to
    }
    if (this.enterdate == null) {
      delete this.enterdate
    }
    if (this.agencies == null) {
      delete this.agencies
    } if (this.status == null) {
      delete this.status
    } if (this.subcates == null) {
      delete this.subcates
    }
    // this.route.queryParams
    //   .subscribe(params => {
    if (this.Rfpnum || this.title || this.states != null || this.cates != null || this.duedate != null || this.enterdate != null || this.agencies || this.status || this.subcates || this.submission_from != null || this.submission_to != null) {
      this._adserv.searchrfprecord(this.Rfpnum, this.title, this.status, this.enterdate, this.duedate, this.states, this.agencies, this.cates, this.pageSize, page, this.subcates, this.submission_from, this.submission_to).subscribe(

        data => {
          this.items = data['Results']
          this.item = data['TotalResult'];
          this.pager = this.pagerService.getPager(data['TotalResult'], page, this.pageSize);
          this.search = false;
        },
        error => {
          this.search = true;
          if (error.status == "400") {
            this.length = 0;
          }
        });
    }
    else {
      this.http.get('https://apis.rfpgurus.com/rf_p/findrfp_web/' + this.pageSize + '?page=' + page)
        .subscribe(Res => {
          this.items = Res['results'];
          this.pager = this.pagerService.getPager(Res['totalItems'], page, this.pageSize);
          this.search = false;

        });
    }
    // });

  }

  ngOnDestroy() {
    // alert('');
    localStorage.removeItem('status')
    localStorage.removeItem('enterdate')
    localStorage.removeItem('duedate')
    localStorage.removeItem('states');
    localStorage.removeItem('agencies')
    localStorage.removeItem('cates')
    localStorage.removeItem('subcat')
    localStorage.removeItem('/find-rfps')
  
  }
}
