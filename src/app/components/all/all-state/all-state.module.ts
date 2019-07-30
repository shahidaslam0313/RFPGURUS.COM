import { MapModule } from './../../cards/map/map.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllStateComponent } from './all-state.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UsMapModule } from 'angular-us-map';
 

const routes: Routes = [
  { path: '', component: AllStateComponent }
]

@NgModule({
  imports: [
    UsMapModule,
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MapModule
  ],
  declarations: [AllStateComponent]
})
export class AllStateModule { }

