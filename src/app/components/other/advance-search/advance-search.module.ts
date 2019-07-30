import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceSearchComponent } from './advance-search.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatNativeDateModule, DateAdapter } from '@angular/material';

const routes: Routes = [
  {
    path: '', component: AdvanceSearchComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    TextMaskModule,
    MatDatepickerModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],

  declarations: [AdvanceSearchComponent]
})
export class AdvanceSearchModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-us'); // DD/MM/YYYY
  }

}

