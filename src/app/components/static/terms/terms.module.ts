import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms.component';
import { Routes, RouterModule} from '@angular/router';
const routes :Routes =[
  {
    path:'',component:TermsComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TermsComponent]
})
export class TermsModule { }

