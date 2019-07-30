import { Component } from '@angular/core';
import { SeoService } from '../../../services/seoService';

declare var $: any;

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.css']
})

export class WhatWeDoComponent {
  constructor(private seoService: SeoService) { }

  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('What We Do?');

    // Updating Open Graph
    this.seoService.updateOGTitle('What We Do?');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('What We Do?');

    // --------------- SEO Service End ---------------
  }
}
