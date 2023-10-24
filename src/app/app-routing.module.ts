import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./Components/Dashboard/dashboard/dashboard.component";
import { ManageCandidatesComponent } from './Components/Dashboard/company-dashboard/manage-candidates/manage-candidates.component';
import { ManageJobsComponent } from './Components/Dashboard/company-dashboard/manage-jobs/manage-jobs.component';
import { PostJobComponent } from './Components/Dashboard/company-dashboard/post-job/post-job.component';
import { ProfileSettingComponent } from './Components/Dashboard/profile-setting/profile-setting.component';

const routes: Routes = [
	{
		path: 'dashboard',
		component:DashboardComponent
	},
	{
		path:'dashboard/manageCandidates',
		component:ManageCandidatesComponent
	},
	{
		path:'dashboard/manageJobs',
		component:ManageJobsComponent
	},
	{
		path:'dashboard/postJob',
		component:PostJobComponent
	},
	{
		path:'dashboard/settings',
		component:ProfileSettingComponent
	},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
