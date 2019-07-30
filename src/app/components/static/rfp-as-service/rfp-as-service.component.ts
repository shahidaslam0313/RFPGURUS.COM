import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seoService';

@Component({
  selector: 'app-rfp-as-service',
  templateUrl: './rfp-as-service.component.html',
  styleUrls: ['./rfp-as-service.component.css']
})
export class RfpAsServiceComponent implements OnInit {

  constructor( private seoService: SeoService) { }

  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('RFP As Service');

    // Updating Open Graph
    this.seoService.updateOGTitle('RFP As Service');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('RFP As Service');

    // --------------- SEO Service End ---------------
  }

}
