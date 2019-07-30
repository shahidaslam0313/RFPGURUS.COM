import { AdvanceService } from './../../other/advance-search/advance.service';
import { HomeService } from './../../common/home/home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleRfpComponent } from './single-rfp.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RfpService } from './rfp.service';
import { AllRfpsService } from '../../all/all-rfps/all-rfps.service';

const routes: Routes = [
    { path: '', component: SingleRfpComponent }
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
    declarations: [SingleRfpComponent],
    providers: [HomeService, AdvanceService, RfpService,AllRfpsService]
})
export class SingleRfpModule { }