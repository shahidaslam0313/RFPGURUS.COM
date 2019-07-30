// ------------------- Components
import { AppComponent } from './app.component';
import { CountdownModule } from 'ng2-countdown-timer';

// ------------------- Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AgmCoreModule } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// ----- Layouts
import { CommonLayoutModule } from './layouts/common/common.module';
import {
  CustomerSupportComponent
} from './components/customer-support/customer.support';
// ------------------- Services
import { SharedData } from './services/shared-service';
import { SeoService } from './services/seoService';

// ------------------- Randoms
import { AuthInterceptor, SetHeaders } from './AuthGuards/auth.interceptor';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthGuard } from './AuthGuards/auth.guard';
import { AuthLogin } from './AuthGuards/auth.login';
import { DatePipe } from '@angular/common';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {  MatFormFieldModule} from '@angular/material';
import { CustomerService } from './components/customer-support/customer-service';

// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule, MatSlideToggleModule, MatNativeDateModule, MatButtonModule,
} from '@angular/material';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("210115018603-187b6essbhk7booo33ab36d1u8cn3jpp.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2294932010834268")
  }
]);
export function provideConfig() {
  return config;
}

import { TextMaskModule } from 'angular2-text-mask';
import { Http, HttpModule } from '@angular/http';
import { PdfViewerComponent } from './components/other/pdf-viewer/pdf-viewer.component';
 
 

// export class MaterialModule {}
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    HttpModule,
    // MaterialModule,
    CountdownModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatNativeDateModule,
    MatButtonModule,
    TextMaskModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPnJ0zatoiPOI1GOeeS7HCj7AxIW183tg'
    }),

    CommonLayoutModule
  ],
  declarations: [
    AppComponent,
    CustomerSupportComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    DatePipe,
    SeoService,
    SharedData,
    CustomerService,
    AuthGuard,
    AuthLogin,
    
  
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    SetHeaders
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }