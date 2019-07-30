import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule,MatChipsModule,MatSlideToggleModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { MaterialModule } from '../../../app.module';

const routes: Routes = [
  {
    path: '', component: ProfileComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    TextMaskModule,
    // MaterialModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProfileComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class ProfileModule { }