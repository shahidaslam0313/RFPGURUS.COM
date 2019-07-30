import { PricingService } from './../../other/pricing/pricing.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentmethodsComponent } from './paymentmethods.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaymentmethodsService } from './paymentmethods.service';

const routes: Routes = [
  {
    path: '', component: PaymentmethodsComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    Ng2SearchPipeModule,
    TextMaskModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [PaymentmethodsComponent],
  providers: [PaymentmethodsService, PricingService]
})
export class PaymentmethodsModule { }