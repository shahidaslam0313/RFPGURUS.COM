import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountActivationComponent } from './accountActivation.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AccountActivationComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountActivationComponent],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AccountActivationModule { }