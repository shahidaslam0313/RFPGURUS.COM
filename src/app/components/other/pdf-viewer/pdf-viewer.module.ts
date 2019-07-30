import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { PdfViewerComponent } from './pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
 
const routes: Routes = [
  {
    path: '', component: PdfViewerComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    PdfViewerModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [PdfViewerComponent]
})
export class PdfViewerssModule { }