import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeModule } from '../../components/common/home/home.module';
import { FooterModule } from '../../components/common/footer/footer.module';
import { HeaderModule } from '../../components/common/header/header.module';

import { CommonComponent } from './common.component';
import { FiltersModule } from '../filters/filters.module';
import { UserprofileModule } from '../userprofile/userprofile.module';

@NgModule({
  declarations: [CommonComponent],
  imports: [
    CommonModule,
    RouterModule,

    HomeModule,
    FooterModule,
    HeaderModule,
    FiltersModule,
    UserprofileModule
  ],
  exports: [CommonComponent]
})
export class CommonLayoutModule { }
