import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSlideToggleModule, MatIconModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { RecapchaModule } from '../recapcha/recapcha.module';
import { SigninService } from '../signin/signin.service';

const routes: Routes = [
  {
    path: '', component: SigninComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    TextMaskModule,
    MatSlideToggleModule,
    RecapchaModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SigninComponent],
  providers: [
    SigninService
  ]
})
export class SigninModule { }
