import { Component } from '@angular/core';
import { SeoService } from '../../../services/seoService';

declare var $: any;

@Component({
  selector: 'app-why-rfpgurus',
  templateUrl: './why-rfpgurus.component.html',
  styleUrls: ['./why-rfpgurus.component.css']
})

export class WhyRfpgurusComponent {
  constructor( private seoService: SeoService) { }

  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Why RFPGurus?');

    // Updating Open Graph
    this.seoService.updateOGTitle('Why RFPGurus?');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Why RFPGurus?');

    // --------------- SEO Service End ---------------
  }
}
