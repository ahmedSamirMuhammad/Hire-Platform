import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/includes/header/header.component';
import { FooterComponent } from './Components/includes/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './Components/Home/home.component';
import { LoginComponent } from './Components/Authentications/login/login.component';
import { SignupComponent } from './Components/Authentications/signup/signup.component';
import { Error404Component } from './Components/ErrorComponents/error404/error404.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { JobProfileComponent } from './Components/Profiles/job-profile/job-profile.component';
import { ExploreJobsComponent } from './Components/Explore/explore-jobs/explore-jobs.component';
import { ExploreCompaniesComponent } from './Components/Explore/explore-companies/explore-companies.component';
import { BookmarksComponent } from './Components/Dashboard/employee-dashboard/bookmarks/bookmarks.component';
import { ReviewsComponent } from './Components/Dashboard/employee-dashboard/reviews/reviews.component';
import { MessagesComponent } from './Components/Dashboard/messages/messages.component';
import { ManageJobsComponent } from './Components/Dashboard/company-dashboard/manage-jobs/manage-jobs.component';
import { ManageCandidatesComponent } from './Components/Dashboard/company-dashboard/manage-candidates/manage-candidates.component';
import { PostJobComponent } from './Components/Dashboard/company-dashboard/post-job/post-job.component';
import { SidebarComponent } from './Components/Dashboard/sidebar/sidebar.component';
import { SummaryComponent } from './Components/Dashboard/summary/summary.component';
import { CompanyDashboardComponent } from './Components/Dashboard/company-dashboard/company-dashboard.component';
import { JobComponent } from './Components/Dashboard/company-dashboard/job/job.component';
import { CandidateComponent } from './Components/Dashboard/company-dashboard/candidate/candidate.component';
import { DashboardFooterComponent } from './Components/Dashboard/company-dashboard/dashboard-footer/dashboard-footer.component';
import { ProfileSettingComponent } from './Components/Dashboard/profile-setting/profile-setting.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    Error404Component,
    ContactUsComponent,
    JobProfileComponent,
    ExploreJobsComponent,
    ExploreCompaniesComponent,
    BookmarksComponent,
    ReviewsComponent,
    MessagesComponent,
    ManageJobsComponent,
    ManageCandidatesComponent,
    PostJobComponent,
    SidebarComponent,
    SummaryComponent,
    CompanyDashboardComponent,
    JobComponent,
    CandidateComponent,
    DashboardFooterComponent,
    ProfileSettingComponent
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
