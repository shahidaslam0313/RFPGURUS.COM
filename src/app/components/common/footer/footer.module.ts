import { HttpClientModule } from '@angular/common/http';
import { FooterService } from './footer.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    declarations: [FooterComponent],
    exports:[FooterComponent],
    providers: [FooterService]
})
export class FooterModule { }