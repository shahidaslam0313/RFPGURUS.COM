import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAgenciesComponent } from './all-agencies.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '', component: AllAgenciesComponent
  }
]
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [AllAgenciesComponent]
})
export class AllAgenciesModule { }




