import { AdvanceService } from './../advance-search/advance.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterSidebarComponent } from './filter-sidebar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule } from '@angular/router';
import { FilterSidebarService } from './filter-sidebar.service';
import { MatNativeDateModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, DateAdapter } from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,

        CommonModule,
        FormsModule,
        Ng2SearchPipeModule,
        RouterModule,
    ],
    declarations: [FilterSidebarComponent],
    providers: [FilterSidebarService, AdvanceService],
    exports: [FilterSidebarComponent]
})
export class FilterSidebarModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale('en-us'); // DD/MM/YYYY
    }
}