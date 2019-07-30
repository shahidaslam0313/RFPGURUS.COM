import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from './services/seoService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  status;
  constructor(private _nav: Router) { }

  ngAfterViewInit() {
  }
  ngOnInit() {
    window.onbeforeunload = function () {
      $(this).scrollTop(0);
    };
    if (window['callPhantom'] || window['_phantom']) {
      window.location.href = "https://www.google.com/";
      let url = 'page-not-found';
      this._nav.navigate([url]);
    }
    if (navigator.webdriver === true) {
      let url = 'page-not-found';
      this._nav.navigate([url]);

    }
    if (window.document.documentElement.getAttribute("webdriver")) {

      let url = 'page-not-found';
      this._nav.navigate([url]);
    }
  }

}