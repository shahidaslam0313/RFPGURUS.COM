import { PricingService } from './pricing.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './pricing.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { PaymentmethodsService } from '../../profile/paymentmethods/paymentmethods.service';
import {CountdownModule} from "ng2-countdown-timer";

const routes: Routes = [
  {
    path: '', component: PricingComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    CountdownModule,
    TextMaskModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PricingComponent],
  providers: [PricingService, PaymentmethodsService]
})
export class PricingModule { }
