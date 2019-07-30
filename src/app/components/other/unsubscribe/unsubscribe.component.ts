import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeService } from './unsubscribe.service';
import swal from 'sweetalert2';
import { SeoService } from '../../../services/seoService';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss'],
  providers: [UnsubscribeService]
})
export class UnsubscribeComponent implements OnInit {
  sub;
  comment;
  constructor(private _serv: UnsubscribeService,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService) { }


  ngOnInit() {
    window.scroll(0, 0);

    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Unsubscribe');

    // Updating Open Graph
    this.seoService.updateOGTitle('Unsubscribe');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Unsubscribe');

    // --------------- SEO Service End ---------------
  }
  email: any = [];
  available;
  fun() {

    this.route.params.subscribe(params => {
      this._serv.qurey(params['query1'], this.comment)
        .subscribe(
          data => {
            this._serv.unsub(params['query1'])
              .subscribe(
                data => {
                  swal({
                    type: 'success',
                    title: 'UnSubScribed Successfully',
                    showConfirmButton: false,
                    timer: 2000, width: '512px',
                  })
                  this.router.navigate(['/']);
                  // if (this.email == "Alredy UnSubScribed") {
                  //   swal({
                  //     type: 'success',
                  //     title: 'Alredy UnSubScribed',
                  //     showConfirmButton: false,
                  //     timer: 2000
                  //   })
                  //   this.router.navigate(['/']);
                  // }
                })
          }
        );
    });
  }

}
