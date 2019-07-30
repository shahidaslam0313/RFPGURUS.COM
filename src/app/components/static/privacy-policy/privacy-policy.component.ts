import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seoService';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css',
              '../terms-privacy-policy.css'
]
})
export class PrivacyPolicyComponent implements OnInit {
  constructor( private seoService: SeoService) { }
  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Privacy Policy');

    // Updating Open Graph
    this.seoService.updateOGTitle('Privacy Policy');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Privacy Policy');

    // --------------- SEO Service End ---------------
  }
}
