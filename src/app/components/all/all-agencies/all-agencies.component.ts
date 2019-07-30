import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllAgenciesService } from './all-agencies.service';
import { SharedData } from '../../../services/shared-service';
import { Location } from '@angular/common';
import { SeoService } from '../../../services/seoService';

@Component({
    selector: 'app-agencies',
    templateUrl: './all-agencies.component.html',
    styleUrls: ['./all-agencies.component.css',
    '../../local-style/all-cats.css'],
    providers: [AllAgenciesService, SharedData]
})
export class AllAgenciesComponent implements OnInit {
    back() {
        this._location.back();
    }
    loaded = false;
    endRequest;
    agency: any;
    agensearch;
    public query: any;
    public Rfp: any;
    public selected: any;
    constructor(public _shareData: SharedData, private _nav: Router, private _serv: AllAgenciesService, private _location: Location, private seoService: SeoService) { }
    singleagency(agency) {
        this.endRequest = this._shareData.agencyInfo(agency);
        let sth = 'agency';
        this._nav.navigate([sth], { queryParams: { agency: agency, } });
    }
    ngOnInit() {
        window.scroll(0, 0);
        // --------------- SEO Service ---------------
        // setting the page title 
        this.seoService.setTitle('All Agencies');

        // Updating Open Graph
        this.seoService.updateOGTitle('All Agencies');
        this.seoService.updateOGURL(window.location.href);

        // setting CanonicalURL
        this.seoService.createLinkForCanonicalURL();

        // setting twitter
        this.seoService.updateTwitterTitle('All Agencies');

        // --------------- SEO Service End ---------------

        this.rfpagencieswithpagination('100');
    }
    mainSearch = 0;
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
    // openSearch(): void {
    //     this.mainSearch = 1;
    //     setTimeout(this.focusInput(), 5000);
    // }
    item;
    filter(val) {
        if (this.query !== "") {
            this.endRequest = this._serv.searchrecord(val).subscribe(response => {
                this.Rfp = response['results'];
                this.item = response['totalItems']
                this.loaded = true;
            });
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
    rfpagencieswithpagination(rfps) {
        this.endRequest = this._serv.rfpagencieswithpagination(rfps)
            .subscribe(data => {
                this.agency = data;
                this.loaded = true;
            })
    }
}
