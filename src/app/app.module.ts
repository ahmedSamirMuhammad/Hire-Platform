import { SidebarComponent } from "./Components/Dashboard/sidebar/sidebar.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Components/includes/header/header.component";
import { FooterComponent } from "./Components/includes/footer/footer.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from "@angular/forms";
import { initSynchronousFactory } from "./init-synchronous.factory";

import { AuthGuard } from "./Guards/auth.guard";
import { Error404Component } from "./Components/ErrorComponents/error404/error404.component";
import { ContactUsComponent } from "./Components/contact-us/contact-us.component";
import { BookmarksComponent } from "./Components/Dashboard/employee-dashboard/bookmarks/bookmarks.component";
import { ReviewsComponent } from "./Components/Dashboard/reviews/reviews.component";
import { MessagesComponent } from "./Components/Dashboard/messages/messages.component";
import { ManageJobsComponent } from "./Components/Dashboard/company-dashboard/manage-jobs/manage-jobs.component";
import { ManageCandidatesComponent } from "./Components/Dashboard/company-dashboard/manage-candidates/manage-candidates.component";
import { PostJobComponent } from "./Components/Dashboard/company-dashboard/post-job/post-job.component";

import { SummaryComponent } from "./Components/Dashboard/summary/summary.component";
import { JobComponent } from "./Components/Dashboard/company-dashboard/job/job.component";
import { DashboardComponent } from "./Components/Dashboard/dashboard/dashboard.component";
import { ProfileSettingComponent } from "./Components/Dashboard/profile-setting/profile-setting.component";
import { DashboardFooterComponent } from "./Components/Dashboard/company-dashboard/dashboard-footer/dashboard-footer.component";
import { CandidateComponent } from "./Components/Dashboard/company-dashboard/candidate/candidate.component";
import { EmployeeSignupComponent } from "./Components/Authentications/signup/employee-signup/employee-signup.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CompanySignupComponent } from "./Components/Authentications/signup/company-signup/company-signup.component";
// import { PaginationComponent } from "./Components/pagination/pagination.component";
import { HttpClientModule } from "@angular/common/http";
import { CompanySettingsComponent } from "./Components/Dashboard/company-dashboard/company-settings/company-settings.component";
import { LoginComponent } from "./Components/Authentications/login/login.component";
import { ForgetPasswordComponent } from "./Components/Authentications/forget-password/forget-password.component";
import { ResetPasswordComponent } from "./Components/Authentications/reset-password/reset-password.component";

import { SearchResultsComponent } from "./Components/search-results/search-results.component";
import { IndexModule } from "./Components/Home/index/index.module";
import { UserProfileModule } from "./Components/Profiles/user-profile/user-profile.module";
import { ModalComponent } from './Components/modal/modal.component';
import { EditReviewsModalContentComponent } from './Components/Dashboard/reviews/edit-reviews-modal-content/edit-reviews-modal-content.component';
import { RatingStarsComponent } from './Components/rating-stars/rating-stars.component';
import { PaymentPlansComponent } from './Components/payment/payment-plans/payment-plans.component';
import { CheckoutComponent } from './Components/payment/checkout/checkout.component';
import { EditJobComponent } from './Components/Dashboard/company-dashboard/edit-job/edit-job.component';
import { JobModuleModule } from "./Components/Profiles/job-profile/job-module/job-module.module";
import { CompanyModuleModule } from "./Components/Profiles/company-profile/company-module/company-module.module";
import { JobsModuleModule } from "./Components/Explore/explore-jobs/jobs-module/jobs-module.module";
import { CompaniesModuleModule } from "./Components/Explore/explore-companies/companies-module/companies-module.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		Error404Component,
		ContactUsComponent,
		BookmarksComponent,
		ReviewsComponent,
		MessagesComponent,
		ManageJobsComponent,
		ManageCandidatesComponent,
		PostJobComponent,
		SidebarComponent,
		SummaryComponent,

		JobComponent,

		ProfileSettingComponent,
		DashboardFooterComponent,
		CandidateComponent,
		SearchResultsComponent,
		EmployeeSignupComponent,
		CompanySignupComponent,
		LoginComponent,
		ForgetPasswordComponent,
		ResetPasswordComponent,
		// PaginationComponent,
		CompanySettingsComponent,
		DashboardComponent,
		ModalComponent,
		EditReviewsModalContentComponent,
		RatingStarsComponent,
		PaymentPlansComponent,
		CheckoutComponent,
		EditJobComponent,

	],

	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ToastrModule,
		ToastrModule.forRoot(),
		FormsModule,
		IndexModule,
		UserProfileModule,
		JobModuleModule,
		CompanyModuleModule,
		JobsModuleModule,
		CompaniesModuleModule,
		SharedModule
	],
	providers: [AuthGuard],
	bootstrap: [AppComponent],
})
export class AppModule {}
