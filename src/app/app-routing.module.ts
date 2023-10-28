import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { ExploreCompaniesComponent } from './Components/Explore/explore-companies/explore-companies/explore-companies.component';
import { CompanyProfileComponent } from './Components/Profiles/company-profile/company-profile/company-profile.component';
import { JobProfileComponent } from './Components/Profiles/job-profile/job-profile/job-profile.component';
import { ExploreJobsComponent } from './Components/Explore/explore-jobs/explore-jobs/explore-jobs.component';
import { IndexComponent } from './Components/Home/index/index.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { Error404Component } from './Components/ErrorComponents/error404/error404.component';
import { UserProfileComponent } from './Components/Profiles/user-profile/user-profile.component';

//dashboard
import { ProfileSettingComponent } from './Components/Dashboard/profile-setting/profile-setting.component';
import { MessagesComponent } from './Components/Dashboard/messages/messages.component';
import { SummaryComponent } from './Components/Dashboard/summary/summary.component';
import { BookmarksComponent } from './Components/Dashboard/employee-dashboard/bookmarks/bookmarks.component';
import { EmployeeSignupComponent } from './Components/Authentications/signup/employee-signup/employee-signup.component';
import { CompanySignupComponent } from './Components/Authentications/signup/company-signup/company-signup.component';
import { LoginComponent } from './Components/Authentications/login/login.component';
import { AuthGuard } from './Guards/auth.guard';
import { ForgetPasswordComponent } from './Components/Authentications/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/Authentications/reset-password/reset-password.component';

import { ManageCandidatesComponent } from './Components/Dashboard/company-dashboard/manage-candidates/manage-candidates.component';
import { ManageJobsComponent } from './Components/Dashboard/company-dashboard/manage-jobs/manage-jobs.component';
import { PostJobComponent } from './Components/Dashboard/company-dashboard/post-job/post-job.component';
import { CompanySettingsComponent } from './Components/Dashboard/company-dashboard/company-settings/company-settings.component';

const routes: Routes = [
  {
    path: '',
		component: IndexComponent
	
  },

  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'error404',
    component: Error404Component
  },
  {
    path: 'dashboard',
	component: DashboardComponent,
	children: [
			{ path: "", redirectTo: "summary", pathMatch: "full" },
			{ path: 'messages', component: MessagesComponent},
			{ path: 'summary', component: SummaryComponent},
			{ path: 'bookmarks', component: BookmarksComponent},
		],
    canActivate : [AuthGuard]

  },
  {
    path: 'explore-companies',
    component: ExploreCompaniesComponent,
  },
  {
    path: 'company-profile/:id',
    component: CompanyProfileComponent,
  },
  {
    path: 'job-profile/:id',
    component: JobProfileComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent ,
  },
  {
    path: 'explore-jobs',
    component: ExploreJobsComponent,
 
  },
  {
    path: 'employee-signup',
    component: EmployeeSignupComponent,
  },
  {
    path: 'company-signup',
    component: CompanySignupComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },

  {
    path: 'reset-password',
    component: ResetPasswordComponent ,
  },
  {
    path: 'dashboard/jobs',
    component: ManageJobsComponent ,
  },
  {
    path: 'dashboard/candidates',
    component: ManageCandidatesComponent ,
  },
  {
    path: 'dashboard/postJob',
    component: PostJobComponent ,
  },
  { path: 'dashboard/user-settings', component: ProfileSettingComponent },
  { path: 'dashboard/company-settings', component: CompanySettingsComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
