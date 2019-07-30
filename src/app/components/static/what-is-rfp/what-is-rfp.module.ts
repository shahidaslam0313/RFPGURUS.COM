import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatIsRfpComponent } from './what-is-rfp.component';
import { Routes, RouterModule} from '@angular/router';
const routes :Routes =[
  {
    path:'',component:WhatIsRfpComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WhatIsRfpComponent]
})
export class WhatIsRfpModule { }
