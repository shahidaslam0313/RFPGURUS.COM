import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seoService';

@Component({
  selector: 'app-features-comparison',
  templateUrl: './features-comparison.component.html',
  styleUrls: ['./features-comparison.component.css']
})
export class FeaturesComparisonComponent implements OnInit {
  constructor(private seoService: SeoService) { }
  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Features Comparison');

    // Updating Open Graph
    this.seoService.updateOGTitle('Features Comparison');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Features Comparison');

    // --------------- SEO Service End ---------------
  }

}
