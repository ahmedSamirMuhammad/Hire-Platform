import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./Components/Dashboard/dashboard/dashboard.component";
import { ExploreCompaniesComponent } from "./Components/Explore/explore-companies/explore-companies/explore-companies.component";
import { CompanyProfileComponent } from "./Components/Profiles/company-profile/company-profile/company-profile.component";
import { JobProfileComponent } from "./Components/Profiles/job-profile/job-profile/job-profile.component";
import { ExploreJobsComponent } from "./Components/Explore/explore-jobs/explore-jobs/explore-jobs.component";
import { MatchedJobsComponent } from "./Components/Explore/explore-jobs/matched-jobs/matched-jobs.component";
// import { IndexComponent } from "./Components/Home/index/index.component";
import { ContactUsComponent } from "./Components/contact-us/contact-us.component";
import { Error404Component } from "./Components/ErrorComponents/error404/error404.component";
// import { UserProfileComponent } from "./Components/Profiles/user-profile/user-profile.component";

//dashboard

import { MessagesComponent } from './Components/Dashboard/messages/messages.component';
import { SummaryComponent } from './Components/Dashboard/summary/summary.component';
import { BookmarksComponent } from './Components/Dashboard/employee-dashboard/bookmarks/bookmarks.component';
import { EmployeeSignupComponent } from './Components/Authentications/signup/employee-signup/employee-signup.component';
import { CompanySignupComponent } from './Components/Authentications/signup/company-signup/company-signup.component';
import { LoginComponent } from './Components/Authentications/login/login.component';
import { AuthGuard } from './Guards/auth.guard';
import { ForgetPasswordComponent } from './Components/Authentications/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/Authentications/reset-password/reset-password.component';
import { ReviewsComponent } from "./Components/Dashboard/reviews/reviews.component";

import { HeaderComponent } from "./Components/includes/header/header.component";

import {SearchResultsComponent} from './Components/search-results/search-results.component';

//adding payment routing
import { PaymentPlansComponent } from "./Components/payment/payment-plans/payment-plans.component";
import { CheckoutComponent } from "./Components/payment/checkout/checkout.component";

const routes: Routes = [
  {
    path: '',
    loadChildren:()=>import('./Components/Home/index/index.module').then(m=>m.IndexModule)
  },
  {
    path: 'header',
    component: HeaderComponent,
    canActivate: [AuthGuard]
  },

	{
		path: "contact-us",
		component: ContactUsComponent,
	},
	{
		path: "error404",
		component: Error404Component,
	},
	{
		path: "dashboard",
		component: DashboardComponent,
		children: [
			{ path: "", redirectTo: "summary", pathMatch: "full" },
			{ path: "summary", component: SummaryComponent },
			{ path: "messages", component: MessagesComponent },
			{ path: "bookmarks", redirectTo: "bookmarks/1", pathMatch: "full" },
			{ path: "bookmarks/:page", component: BookmarksComponent },
			{ path: "reviews", redirectTo: "reviews/1", pathMatch: "full" },
			{ path: "reviews/:page", component: ReviewsComponent },
		],
		canActivate: [AuthGuard],
	},

//  <!-- explore-companies routes / Start -->
{ path: "explore-companies", redirectTo: "explore-companies/1", pathMatch: "full" },
{
  path: 'explore-companies/:page',
  component: ExploreCompaniesComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./Components/Explore/explore-companies/companies-module/companies-module.module').then((m) => m.CompaniesModuleModule),
    },
  ],
},
//  <!-- explore-companies routes / End -->

//  <!-- explore-jobs routes / Start -->
{ path: "explore-jobs", redirectTo: "explore-jobs/-/1", pathMatch: "full" },
{
  path: 'explore-jobs/:params/:page',
  component: ExploreJobsComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./Components/Explore/explore-jobs/jobs-module/jobs-module.module').then((m) => m.JobsModuleModule),
    },
  ],
},
//  <!-- explore-jobs routes / End -->

//  <!-- company-profile routes / Start -->
{
  path: 'company-profile/:id',
  component: CompanyProfileComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./Components/Profiles/company-profile/company-module/company-module.module').then((m) => m.CompanyModuleModule),
    },
  ],
},
//  <!-- company-profile routes / End -->

//  <!-- job-profile routes / Start -->
{
  path: 'job-profile/:id',
  component: JobProfileComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./Components/Profiles/job-profile/job-module/job-module.module').then((m) => m.JobModuleModule),
    },
  ],
},
//  <!-- job-profile routes / End -->

  {
    path: 'employee-signup',
    component: EmployeeSignupComponent,
  },
  {
    path: 'company-signup',
    component: CompanySignupComponent,
  },

	{
		path: "login",
		component: LoginComponent,
	},

	{
		path: "forget-password",
		component: ForgetPasswordComponent,
	},

  {
    path: 'reset-password',
    component: ResetPasswordComponent ,
  },
//   {
//     path: 'dashboard/jobs',
//     component: ManageJobsComponent ,
//   },
//   {
//     path: 'dashboard/candidates',
//     component: ManageCandidatesComponent ,
//   },
//   {
//     path: 'dashboard/postJob',
//     component: PostJobComponent ,
//   },


//   { path: 'dashboard/company-settings',
//    component: CompanySettingsComponent },

//   { path: 'dashboard/editJob/:id',
//    component: EditJobComponent },

  {
    path: 'search-results',
    component: SearchResultsComponent,
  },

  //adding payment routing
  {
    path: 'payment',
    component: PaymentPlansComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
//   {
//     path: '**',
//     component: Error404Component,
//   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {}
