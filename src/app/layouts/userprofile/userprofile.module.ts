import { NgModule } from '@angular/core';
import { UserprofileComponent } from './userprofile.component';
import { SidebarComponent } from 'src/app/components/profile/sidebar/sidebar.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 
import { FooterModule } from 'src/app/components/common/footer/footer.module';

@NgModule({
  declarations: [UserprofileComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FooterModule,
    // FooterCmpModule
  ],
  exports: [UserprofileComponent]
})
export class UserprofileModule { }
