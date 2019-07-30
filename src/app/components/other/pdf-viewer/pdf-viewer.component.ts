import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllRfpsService } from '../../all/all-rfps/all-rfps.service';
import swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css'],
  providers: [ AllRfpsService]
})
export class PdfViewerComponent implements OnInit {
  pdfSrc;
  a;
  b;
  query ;
  title;
  page= 1;

  constructor(private route: ActivatedRoute,private _serv: AllRfpsService) { }
  // https://storage.rfpgurus.com/bplrfpgurus/794940-Bid-Ad-Lake-Elmo-Regional-Park-Reserve-Improvements
  ngOnInit() {
  
    this.route.queryParams
    .subscribe(params => {
      this.query = params['query']
    })
this.title = localStorage.getItem('title_infoo')
    this.pdfSrc = 'https://apis.rfpgurus.com/rf_p/view_pdf/'+this.query +'/'+JSON.parse(localStorage.getItem('currentUser')).userid
  
  }
  public showPDF(): void {
    this._serv.getPDF(this.query)
        .subscribe(x => {
            // It is necessary to create a new blob object with mime-type explicitly set
            // otherwise only Chrome works like it should
            var newBlob = new Blob([x], { type: "application/pdf" });

            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }

            // For other browsers: 
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            link.href = data;
            // this.a = this.query;
            // this.b = 
            link.download = this.title+".pdf";
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
}

}
