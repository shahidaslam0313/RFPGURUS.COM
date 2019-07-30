import { HomeService } from './../../common/home/home.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AllStateService } from './all-state.service';
import { SharedData } from '../../../services/shared-service';
import { Location } from '@angular/common';
import { SeoService } from '../../../services/seoService';
import { States } from '../../arrays';
 

@Component({
  selector: 'app-all-state',
  templateUrl: './all-state.component.html',
  styleUrls: ['./all-state.component.css',
  '../../local-style/all-cats.css'],
  providers: [AllStateService, SharedData, HomeService]
})
export class AllStateComponent implements OnInit, OnDestroy {
  endRequest;
  state: any = [];
  statesearch;
  states;
  back() {
    this._location.back();
  }
  public query: any;
  public Rfp: any;
  public selected: any;
  mainSearch = 0;
  constructor(private homeServ: HomeService, public _shareData: SharedData, private _nav: Router, private _serv: AllStateService, private _location: Location, private seoService: SeoService) {
    this.endRequest = this.homeServ.rfpstate().subscribe(
      data => {
        this.state = data['Result'];
      })
  }
  singlestate(state) {
    this.endRequest = this._shareData.stateInfo(state);
    let sth = 'state';
    this._nav.navigate([sth], { queryParams: { state: state, } });
  }
  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('All States');

    // Updating Open Graph
    this.seoService.updateOGTitle('All States');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('All States');

    // --------------- SEO Service End ---------------
  }
  closeSearch() {
    if (this.mainSearch == 1) {
      this.mainSearch = 0;
      this.query = '';
      this.Rfp = '';
    }
  }
  focusInput() {
    if (this.mainSearch == 1) {
      let inputField: HTMLElement = <HTMLElement>document.querySelectorAll('.search-holder input')[0];
      inputField.focus();
    }
  }
  item;
  filter(val) {
    if (val != "") {
      this._serv.searchrecord(val).subscribe(response => {
        this.state = response['results'];
        this.item = response['totalItems']
      });
    } else {
      this.homeServ.rfpstate().subscribe(
        data => {
          this.item = data['totalItems']
          this.state = data['Result'];
        })
    }
  }
  select(item) {
    this.selected = item;
    this.mainSearch = 0;
    this.query = '';
    this.Rfp = '';
  }
  singlerfp(id, num) {
    let sth = 'single-rfp';
    this._nav.navigate([sth], { queryParams: { id: id, rfp: num } });
  }
  ngOnDestroy() {
    // this.endRequest.unsubscribe();
  }
}
