import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatWeDoComponent } from './what-we-do.component';
import { Routes, RouterModule} from '@angular/router';
const routes :Routes =[
  {
    path:'',component:WhatWeDoComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WhatWeDoComponent]
})
export class WhatWeDoModule { }

