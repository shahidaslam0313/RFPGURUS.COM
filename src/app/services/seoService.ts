import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
   providedIn: 'root'
})

export class SeoService {
   constructor(@Inject(DOCUMENT) private doc, private titleService: Title, private meta: Meta) { }

   // ------------ Set Page Title ------------
   defaultTitle() {
      this.titleService.setTitle('RFPGurus | Find RFP Bid Sites | Government Request for Proposal');
   }

   setTitle(name) {
      this.titleService.setTitle(name + ' | RFPGurus | Find RFP Bid Sites | Government Request for Proposal');
   }

   // ------------ CanonicalURL ------------

   createLinkForCanonicalURL() {
      let link: HTMLLinkElement = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
      link.setAttribute('href', this.doc.URL);
   }

   // ------------- Meta ------------------
   //  open graph
   defaultOGTitle() {
      this.meta.updateTag({ property: 'og:title', content: 'RFPGurus | Find RFP Bid Sites | Government Request for Proposal' });
   }

   updateOGTitle(title) {
      this.meta.updateTag({ property: 'og:title', content: title + ' | RFPGurus | Find RFP Bid Sites | Government Request for Proposal' });
   }

   updateOGURL(url) {
      this.meta.updateTag({ property: 'og:url', content: url });
   }

   //  Twitter
   defaultTwitterTitle() {
      this.meta.updateTag({ name: 'twitter:title', content: "RFPGurus | Find RFP Bid Sites | Government Request for Proposal" });
   }

   updateTwitterTitle(name) {
      this.meta.updateTag({ name: 'twitter:title', content: name + " | RFPGurus | Find RFP Bid Sites | Government Request for Proposal" });
   }

   addMetaKeyWords(keyword) {
      this.meta.addTag({ name: 'Keywords', content: keyword });
   }

} 