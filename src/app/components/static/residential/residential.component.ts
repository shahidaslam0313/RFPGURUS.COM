import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SeoService } from '../../../services/seoService';

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'dialog-overview-example',
    templateUrl: 'residential.component.html',
    styleUrls: ['./residential.component.css']
})

export class DialogOverviewExample {
    ngOnInit() {
        window.scroll(0, 0);
        // --------------- SEO Service ---------------
        // setting the page title 
        this.seoService.setTitle('FAQ');

        // Updating Open Graph
        this.seoService.updateOGTitle('FAQ');
        this.seoService.updateOGURL(window.location.href);

        // setting CanonicalURL
        this.seoService.createLinkForCanonicalURL();

        // setting twitter
        this.seoService.updateTwitterTitle('FAQ');

        // --------------- SEO Service End ---------------

    }
    animal: string;
    name: string;

    constructor(public dialog: MatDialog, private seoService: SeoService) { }
}


