import { AdvanceService } from './../../other/advance-search/advance.service';
import { HomeService } from './../../common/home/home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistComponent } from './watchlist.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedData } from '../../../services/shared-service'
import { RfpService } from '../../single/single-rfp/rfp.service';

const routes: Routes = [
  { path: '', component: WatchlistComponent }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    TextMaskModule,
    RouterModule.forChild(routes),
  ],
  declarations: [WatchlistComponent],
  providers: [SharedData, RfpService, HomeService, AdvanceService]
})
export class WatchlistModule { }