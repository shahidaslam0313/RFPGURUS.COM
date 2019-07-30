import { Component } from '@angular/core';
import { SeoService } from '../../../services/seoService';

declare var $: any;
@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css']
})
export class OurTeamComponent {
  constructor(private seoService: SeoService) { }
  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Our Expert Team');

    // Updating Open Graph
    this.seoService.updateOGTitle('Our Expert Team');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Our Expert Team');

    // --------------- SEO Service End ---------------
  }
}
