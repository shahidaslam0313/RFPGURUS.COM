import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsubscribeComponent } from './unsubscribe.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UnsubscribeService } from './unsubscribe.service';

const routes: Routes = [
  {
    path: '', component: UnsubscribeComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    TextMaskModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnsubscribeComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [UnsubscribeService]
})
export class UnsubscribeModule { }


