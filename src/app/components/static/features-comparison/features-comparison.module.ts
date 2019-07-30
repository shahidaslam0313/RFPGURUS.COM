import { FeaturecomparisonModule } from './../../cards/featurecomparison/featurecomparison.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComparisonComponent } from './features-comparison.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '', component: FeaturesComparisonComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeaturecomparisonModule
  ],
  declarations: [FeaturesComparisonComponent]
})
export class FeaturesComparisonModule { }