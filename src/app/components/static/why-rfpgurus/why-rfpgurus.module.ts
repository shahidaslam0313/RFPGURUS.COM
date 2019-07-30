import { FeaturecomparisonModule } from './../../cards/featurecomparison/featurecomparison.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhyRfpgurusComponent } from './why-rfpgurus.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '', component: WhyRfpgurusComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeaturecomparisonModule
  ],
  declarations: [WhyRfpgurusComponent]
})
export class WhyRfpgurusModule { }
