import { HomeComponent } from './components/common/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLogin } from './AuthGuards/auth.login';
import { AuthGuard } from './AuthGuards/auth.guard';
import { UserprofileComponent } from './layouts/userprofile/userprofile.component';
import { FiltersComponent } from './layouts/filters/filters.component';
import {
  CustomerSupportComponent
} from './components/customer-support/customer.support';
const routes: Routes = [

  // =========== Default Paths ===========
  { path: '', redirectTo: '/', pathMatch: 'full', },
  { path: '', component: HomeComponent },


  // =========== Auths ===========
  { path: 'signin', loadChildren: './components/Auth/signin/signin.module#SigninModule', canActivate: [AuthLogin] },
 
  { path: 'signup', loadChildren: './components/Auth/signup/signup.module#SignupModule' },
  { path: 'activateaccount/:query1', loadChildren: './components/Auth/accountActivation/accountActivation.module#AccountActivationModule' },
  // 
  // =========== Static pages ===========
  { path: 'who-are-we', loadChildren: './components/static/about/about.module#AboutModule' },
  { path: 'contact-us', loadChildren: './components/static/contact-us/contact-us.module#ContactUsModule' },
  { path: 'features-comparison', loadChildren: './components/static/features-comparison/features-comparison.module#FeaturesComparisonModule' },
  { path: 'how-it-works', loadChildren: './components/static/how-it-works/how-it-work.module#HowItWorksModule' },
  { path: 'our-team', loadChildren: './components/static/our-team/our-team.module#OurTeamModule' },
  { path: 'privacy-policy', loadChildren: './components/static/privacy-policy/privacy-policy.module#PrivacyPolicyModule' },
  { path: 'faqs', loadChildren: './components/static/residential/residential.module#DialogOverviewModule' },
  { path: 'rfp-as-service', loadChildren: './components/static/rfp-as-service/rfp-as-service.module#RfpAsServiceModule' },
  { path: 'terms', loadChildren: './components/static/terms/terms.module#TermsModule' },
  { path: 'what-is-rfpgurus', loadChildren: './components/static/what-is-rfp/what-is-rfp.module#WhatIsRfpModule' },
  { path: 'what-we-do', loadChildren: './components/static/what-we-do/what-we-do.module#WhatWeDoModule' },
  { path: 'why-rfpgurus', loadChildren: './components/static/why-rfpgurus/why-rfpgurus.module#WhyRfpgurusModule' },

  // =========== All =========== 
  { path: 'all-category', loadChildren: './components/all/all-category/all-category.module#AllCategoryModule' },
  { path: 'all-agencies', loadChildren: './components/all/all-agencies/all-agencies.module#AllAgenciesModule' },
  { path: 'all-states', loadChildren: './components/all/all-state/all-state.module#AllStateModule' },
  { path: 'forgetpassword/:query2', loadChildren: './components/forget-password/forget-password.module#ForgetPasswordModule' },


  // =========== User Profile ===========  
  {
    path: '', component: UserprofileComponent, children: [
      { path: 'purchase-history', loadChildren: './components/profile/purchase-history/purchase-history.module#PurchaseHistoryModule', canActivate: [AuthGuard] },
      { path: 'preferences', loadChildren: './components/profile/Preferences/profile.module#ProfileModule', canActivate: [AuthGuard] },
      { path: 'change-password', loadChildren: './components/profile/changed-password/changed-password.module#ChangedPasswordModule', canActivate: [AuthGuard] },
      { path: 'profile', loadChildren: './components/profile/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
      { path: 'payment', loadChildren: './components/profile/paymentmethods/paymentmethods.module#PaymentmethodsModule', canActivate: [AuthGuard] },
      { path: 'notifications', loadChildren: './components/profile/allnotification/allnotification.module#AllnotificationModule', canActivate: [AuthGuard] },
      { path: 'my-watchlist', loadChildren: './components/profile/watchlist/watchlist.module#WatchlistModule', canActivate: [AuthGuard] },
      {
        path: 'support',
        component: CustomerSupportComponent
    },
    ]
  },

  // =========== Filters ===========  
  {
    path: '', component: FiltersComponent, 
    children: [

      { path: 'latest-rfps', loadChildren: './components/all/all-rfps/all-rfps.module#AllRfpsModule' },
      { path: 'find-rfps', loadChildren: './components/other/find-rfp/find-rfp.module#FindRfpModule' },
      { path: 'searched-data', loadChildren: './components/other/results/results.module#ResultsModule' },

      // =========== Single ===========    
      { path: 'agency', loadChildren: './components/single/agency-rfp/agency-rfp.module#AgencyRfpModule' },
      { path: 'category', loadChildren: './components/single/category-rfp/category-rfp.module#CategoryRfpModule' },
      { path: 'state', loadChildren: './components/single/state-rfp/state-rfp.module#StateRfpModule' },
      { path: 'subcategory', loadChildren: './components/single/subcategory-rfp/subcategory-rfp.module#SubCategoryRfpModule' },
      { path: 'rfp', loadChildren: './components/single/single-rfp/single-rfp.module#SingleRfpModule' },
    ]
  },

  // =========== Others =========== 
  { path: 'advanced-search', loadChildren: './components/other/advance-search/advance-search.module#AdvanceSearchModule' },
  { path: 'partnership', loadChildren: './components/other/partnership/partnership.module#PartnershipModule' },
  { path: 'unsubscribe/:query1', loadChildren: './components/other/unsubscribe/unsubscribe.module#UnsubscribeModule' },
  { path: 'pricing', loadChildren: './components/other/pricing/pricing.module#PricingModule' },
  { path: 'pdfviewer', loadChildren: './components/other/pdf-viewer/pdf-viewer.module#PdfViewerssModule', canActivate: [AuthGuard]  },


  // =========== Not Found Page ===========  
  { path: '**', loadChildren: './components/static/page404/page404.module#Page404Module' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
