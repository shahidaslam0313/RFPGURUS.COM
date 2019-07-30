import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AllCategoryService } from './all-category.service';
import { SharedData } from '../../../services/shared-service';
import { Location } from '@angular/common';
import { SeoService } from '../../../services/seoService';
import { AdvanceService } from '../../../components/other/advance-search/advance.service';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css',
    '../../local-style/all-cats.css'
],
  providers: [AllCategoryService, SharedData]
})
export class AllCategoryComponent implements OnInit, OnDestroy {
  endRequest; sub_categories: any = [];
  back() {
    this._location.back();
  }
  subcategory(value) {
    this._adserv.rfpsinglesubcat(value).subscribe(
      data => {
        this.sub_categories = data['sub_categories'];
      }
    )
  }
  loaded = false;
  cat: any = [];
  // public Rfp: any;
  catsearch;
  public query: any;
  public Rfp: any;
  public selected: any;
  mainSearch = 0;
  constructor(private _adserv: AdvanceService, public _shareData: SharedData, private _nav: Router, private _serv: AllCategoryService, private _location: Location, private seoService: SeoService) {

    
  }
  catrfp(cat) {
    this.endRequest = this._shareData.categoryInfo(cat);
    let sth = 'category';
    this._nav.navigate([sth], { queryParams: { cat: cat } });
  }
  ngOnInit() {
    window.scroll(0, 0);
    this._serv.rfpcategory_subsat().subscribe(
      data => {
        this.cat = data;
      },
      error => {
      }
    )
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('All Categories');

    // Updating Open Graph
    this.seoService.updateOGTitle('All Categories');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('All Categories');

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
  item :boolean = false;
  filter(val) {
    if (val != '') {
     
      this._serv.searchrecord(val).subscribe(response => {
        this.cat = response;
        console.log(this.cat)
        this.item = false;
        if(this.cat.length == '0'){

          this.item = true
        }
   
        // this.item = this.cat.length;
        // alert(  this.item );

      });
    }
    else {
      this.item = false;
      this._serv.rfpcategory_subsat().subscribe(
        data => {
          this.cat = data;
        })
    }
  }
  select(item) {
    this.selected = item;
    alert(this.selected);
    this.mainSearch = 0;
    this.query = '';
    this.Rfp = '';
  }
  singlerfp(id, num) {
    let sth = 'single-rfp';
    this._nav.navigate([sth], { queryParams: { id: id, rfp: num } });
  }
  ngOnDestroy() {
    
  }
}
