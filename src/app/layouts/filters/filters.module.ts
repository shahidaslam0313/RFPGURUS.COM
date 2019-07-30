import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import { FilterSidebarModule } from '../../components/other/filter-sidebar/filter-sidebar.module';
import { RouterModule } from '@angular/router';
import { FooterModule } from 'src/app/components/common/footer/footer.module';

@NgModule({
  declarations: [FiltersComponent],
  imports: [
    FilterSidebarModule,
    CommonModule,
    RouterModule,
    FooterModule
  ],
  exports: [FiltersComponent]
})
export class FiltersModule { }
