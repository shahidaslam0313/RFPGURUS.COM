import { RandomCategoriesModule } from './../../cards/random-categories/random-categories.module';
import { FeaturecomparisonModule } from './../../cards/featurecomparison/featurecomparison.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './home.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { SlickModule } from 'ngx-slick';
import { MapModule } from '../../cards/map/map.module';
import {CountdownModule} from "ng2-countdown-timer";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SlickModule,
        HttpClientModule,
        CountdownModule,
        FeaturecomparisonModule,
        RandomCategoriesModule,
        MapModule,
       
         
    ],
    declarations: [HomeComponent],
    providers: [HomeService],
    exports: [HomeComponent]
})
export class HomeModule { }
