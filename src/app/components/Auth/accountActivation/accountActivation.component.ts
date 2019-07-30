import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from "../signup/signup.service";
import swal from 'sweetalert2';
import { SeoService } from 'src/app/services/seoService';
@Component({
  selector: 'app-account-activation',
  templateUrl: './accountActivation.component.html',
  styleUrls: ['./accountActivation.component.css']
})
export class AccountActivationComponent implements OnInit, OnDestroy {
  endRequest;
  sub;
  constructor(
    private seoService: SeoService,
    private signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit() {
    window.scroll(0, 0);
    this.endRequest = this.sub = this.route.params.subscribe(params => {
      this.authenticate(params['query1'])
    });
  }
  authenticate(uid) {
    this.endRequest = this.signupService.authenticate_service(uid)
      .subscribe(
        data => {
          swal({
            type: 'success',
            title: 'Your account has been successfully verified. Please login to continue for a Next-Gen RFP Search and Alert experience.',
            showConfirmButton: false,
            timer: 2000,
            width: '512px',
          })
          this.router.navigate(['/signin']);
        },
        error => {
          if (error.status == 403) {
            swal({
              type: 'error',
              title: 'Your account has already been activated',
              showConfirmButton: false,
              timer: 2000,
              width: '512px',
            })
          }
          this.router.navigate(['/signin']);
        });
  }
  ngOnDestroy() {
  }
}
