import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seoService';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: [
    './terms.component.css',
    '../terms-privacy-policy.css'
]
})
export class TermsComponent implements OnInit {

  constructor(private seoService: SeoService) { }

  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Terms');

    // Updating Open Graph
    this.seoService.updateOGTitle('Terms');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Terms');

    // --------------- SEO Service End ---------------
  }

}
