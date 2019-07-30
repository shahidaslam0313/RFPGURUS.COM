import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindRfpComponent } from './find-rfp.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatNativeDateModule, DateAdapter } from '@angular/material';

const routes: Routes = [
  {
    path: '', component: FindRfpComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    Ng2SearchPipeModule,
    MatNativeDateModule,
    TextMaskModule,
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FindRfpComponent]
})
export class FindRfpModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-us'); // DD/MM/YYYY
  }

}