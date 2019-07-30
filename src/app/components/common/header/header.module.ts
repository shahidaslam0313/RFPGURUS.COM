import { HomeService } from './../home/home.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderService } from './header.service';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { SpeechRecognitionService } from './speechservice';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [HeaderComponent],
  providers: [
    HeaderService,
    SpeechRecognitionService,
    HomeService
  ]
})
export class HeaderModule { }
