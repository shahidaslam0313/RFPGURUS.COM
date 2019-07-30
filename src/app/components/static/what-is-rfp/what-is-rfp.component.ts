import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seoService';

@Component({
  selector: 'app-what-is-rfp',
  templateUrl: './what-is-rfp.component.html',
  styleUrls: ['./what-is-rfp.component.css']
})
export class WhatIsRfpComponent implements OnInit {

  constructor( private seoService: SeoService) { }

  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('What is RFPGurus?');

    // Updating Open Graph
    this.seoService.updateOGTitle('What is RFPGurus?');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('What is RFPGurus?');

    // --------------- SEO Service End ---------------
  }

}
