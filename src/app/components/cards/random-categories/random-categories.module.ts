import { RouterModule } from '@angular/router';
import { RandomCategoriesComponent } from './random-categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RandomCategoriesComponent],
  imports: [RouterModule, CommonModule],
  exports: [RandomCategoriesComponent]
})
export class RandomCategoriesModule { }
