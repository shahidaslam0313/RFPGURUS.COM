import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogOverviewExample } from './residential.component';
import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes :Routes =[
  {
    path:'',component:DialogOverviewExample
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
  declarations: [DialogOverviewExample]
})
export class DialogOverviewModule { }
