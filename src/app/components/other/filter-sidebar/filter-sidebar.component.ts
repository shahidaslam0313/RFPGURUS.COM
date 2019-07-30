import { FilterSidebarService } from './filter-sidebar.service';
import { HomeService } from './../../common/home/home.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from '../../../services/shared-service';
import { AdvanceService } from '../advance-search/advance.service';
import { DatePipe } from '@angular/common';
import { AllCategoryService } from '../../all/all-category/all-category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css',
    '../../local-style/filter-sidebar.css'
  ],
  providers: [AllCategoryService, HomeService]
})
export class FilterSidebarComponent implements OnInit, OnDestroy {
  cat: any = [];
  state: any = [];
  agency: any = [];
  subcates;
  subcatsearch;

  statsearch;
  catsearch;
  agensearch;

  enterdate;
  duedate;
  agencies;
  states;
  cates;
  loaded;
  cat_subcat: any = [];
  status; sub_categories: any[];
  foods = [
    { value: 'active', viewValue: 'Active' },
    { value: 'expire', viewValue: 'Expire' },
    { value: 'all', viewValue: 'All' }
  ];
  local;
  uname;
  endRequest;
  constructor(private filterServ: FilterSidebarService, private homeServ: HomeService, private datePipe: DatePipe, public _shareData: SharedData, private _nav: Router, private advanceService: AdvanceService, private allCatService: AllCategoryService) {
    if (localStorage.getItem('status')) {
      this.status = localStorage.getItem('status');
    }
    if (localStorage.getItem('enterdate')) { this.enterdate = localStorage.getItem('enterdate') }
    if (localStorage.getItem('duedate')) { this.duedate = localStorage.getItem('duedate') }
    if (localStorage.getItem('submission_from')) { this.submission_from = localStorage.getItem('submission_from') }
    if (localStorage.getItem('submission_to')) { this.submission_to = localStorage.getItem('submission_to') }
    if (localStorage.getItem('states')) {
      this.states = localStorage.getItem('states');
    }
    if (localStorage.getItem('agencies')) { this.agencies = localStorage.getItem('agencies') }
    if (localStorage.getItem('cates')) { this.cates = localStorage.getItem('cates') }
    if (localStorage.getItem('subcat')) { this.subcates = localStorage.getItem('subcat') }
    this.allCatService.rfpcategory_subsat().subscribe(
      data => {
        this.cat_subcat = data;
        this.loaded = true;
      })
  }

  changestate(states) {

    this.states = states;
    localStorage.setItem('states', this.states)
    if(localStorage.getItem('pages')){
    var page_num:number=Number(localStorage.getItem('pages'));
    // this.onPaginateChange(page_num);
    }else{
    // this.onPaginateChange(1);
    }
    this.onSubmit();
    }

    

    select_state() {
    if (this.states) {
      localStorage.removeItem('agencies');
      localStorage.removeItem('cates');
      localStorage.removeItem('subcat');
      delete this.agencies
      delete this.cates;
      delete this.subcates;
    }
    if (this.states == 'all') {

    } else {
     
      this.advanceService.dropdown(this.states, this.agencies, this.cates, this.subcates).subscribe(
        data => {
          if (data['States']) {
            this.state = data['States'];

          }
          if (data['Categories']) {
            this.cat = data['Categories'];
          }
          if (data['Agencies']) {
            // this.agency = data['Agencies'];
            this.agency = data['Agencies'];

          }
          if (data['Sub_categories_list']) { this.sub_categories = data['Sub_categories_list']; }

        })

    }
    this.onSubmit();

  }
  select_agency() {
    if (this.agencies) {
      delete this.cates;
      delete this.subcates;
      localStorage.removeItem('cates');
      localStorage.removeItem('subcat');
    }
    if (this.agencies == 'all') {

    }

    else {
      this.advanceService.dropdown(this.states, this.agencies, this.cates, this.subcates).subscribe(
        data => {
          if (data['States']) {
            this.state = data['States'];

          }
          if (data['Categories']) {
            this.cat = data['Categories'];
          }
          if (data['Agencies']) {
            // this.agency = data['Agencies'];
            this.agency = data['Agencies'];

          }
          if (data['Sub_categories_list']) { this.sub_categories = data['Sub_categories_list']; }

        })

    }
    this.onSubmit();

  }
  select_category() {
   
    if (this.cat == 'all') {

    }
    else
    {
     
      localStorage.setItem('cates', this.cates)
      this.advanceService.dropdown(this.states, this.agencies, this.cates, this.subcates).subscribe(
        data => {
          if (data['States']) {
            this.state = data['States'];
  
          }
          if (data['Categories']) {
            this.cat = data['Categories'];
          }
          if (data['Agencies']) {
            // this.agency = data['Agencies'];
            this.agency = data['Agencies'];
  
          }
          if (data['Sub_categories_list']) { this.sub_categories = data['Sub_categories_list']; }
  
        })
    }
   
    this.onSubmit();
  }
  submission_from;
  submission_to;

  formclear(f : NgForm) {
    delete this.cates;
    delete this.status;
    delete this.enterdate;
    delete this.duedate;
    delete this.states;
    delete this.agencies;
    delete this.subcates;
    delete this.submission_from;
    delete this.submission_to;
    localStorage.removeItem('cates');
    localStorage.removeItem('status');
    localStorage.removeItem('enterdate');
    localStorage.removeItem('duedate');
    localStorage.removeItem('states');
    localStorage.removeItem('agencies');
    localStorage.removeItem('subcates');
    localStorage.removeItem('submission_from');
    localStorage.removeItem('submission_to');
    this.statsearch=null;
    this.catsearch=null;
    this.subcatsearch=null;
    this.agensearch=null;
    
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
    // console.log(this.status);
    f.resetForm();
  }
  
  onSubmit() {

    // if (F.valid == true) {
    if (this.status) {
      localStorage.setItem('status', this.status)
    }
    if (this.enterdate) { localStorage.setItem('enterdate', this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.duedate) { localStorage.setItem('duedate', this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.submission_from) { localStorage.setItem('submission_from', this.datePipe.transform(this.submission_from, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.submission_to) { localStorage.setItem('submission_to', this.datePipe.transform(this.submission_to, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.states) { localStorage.setItem('states', this.states) }
    if (this.agencies) { localStorage.setItem('agencies', this.agencies) }
    if (this.cates) { localStorage.setItem('cates', this.cates) }
    if (this.subcates) { localStorage.setItem('subcat', this.subcates) }
    let searchUrl = 'find-rfps';

    this._nav.navigate([searchUrl],

      {
        queryParams: {
          status: this.status,
          enterdate: this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a "),
          duedate: this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a "),
          state: this.states,
          agency: this.agencies,
          cat: this.cates,
          subcat: this.subcates,
          submission_to: this.datePipe.transform(this.submission_to, "yyyy-MM-dd h:mm:ss a "),
          submission_from: this.datePipe.transform(this.submission_from, "yyyy-MM-dd h:mm:ss a ")
        }
      });
    // }
  }
f;
  catRfp(item) {

    this._shareData.categoryInfo(item);
    this.formclear(this.f);
    let sth = 'category';
    // sth=sth.replace(/&/g,'and').replace(/\s+/g, '-').toLowerCase();
    this._nav.navigate([sth], { queryParams: { cat: item } });
  }

  rfpState(state) {
    this._shareData.stateInfo(state);
    this.formclear(this.f);
    let sth = 'state';
    
    // sth=sth.replace(/&/g,'and').replace(/\s+/g, '-').toLowerCase();
    this._nav.navigate([sth], { queryParams: { state: state, } });
  }

  subcategory(value) {
    this.advanceService.rfpsinglesubcat(value).subscribe(
      data => {
        this.sub_categories = data['sub_categories'];
      }
    )
  }

  ngOnInit() {
    window.scroll(0, 0);
    if (localStorage.getItem('status')) { this.status = localStorage.getItem('status') }
    if (localStorage.getItem('enterdate')) { this.enterdate = localStorage.getItem('enterdate') }
    if (localStorage.getItem('duedate')) { this.duedate = localStorage.getItem('duedate') }
    if (localStorage.getItem('states')) {
      this.states = localStorage.getItem('states');
    }
    if (localStorage.getItem('submission_from')) { this.submission_from = localStorage.getItem('submission_from') }
    if (localStorage.getItem('submission_to')) { this.submission_to = localStorage.getItem('submission_to') }
    if (localStorage.getItem('agencies')) { this.agencies = localStorage.getItem('agencies') }
    if (localStorage.getItem('cates')) { this.cates = localStorage.getItem('cates') }
    if (localStorage.getItem('subcat')) { this.subcates = localStorage.getItem('subcat') }
    this.endRequest = this.homeServ.rfpstate().subscribe(
      data => {
        this.state = data['Result'];
      });
      this.endRequest = this.filterServ.agencies().subscribe(
        data => {
          this.agency = data['Result'];
        });
    this.endRequest = this.homeServ.rfpcategory().subscribe(
      data => {
        this.cat = data;
      });
   
  }

  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username

      return true
    }
    else {
      return false
    }

  }

  ngOnDestroy() {
    this.endRequest.unsubscribe();
    localStorage.removeItem('status')
    localStorage.removeItem('enterdate')
    localStorage.removeItem('duedate')
    localStorage.removeItem('submission_from')
    localStorage.removeItem('submission_to')
    localStorage.removeItem('states')
    localStorage.removeItem('subcat')
    localStorage.removeItem('agencies')
    localStorage.removeItem('cates')
    delete this.status;
    delete this.enterdate;
    delete this.duedate;
    delete this.submission_from;
    delete this.submission_to;
    delete this.states;
    delete this.agencies;
    delete this.cates;
    delete this.subcates;
  }
}
