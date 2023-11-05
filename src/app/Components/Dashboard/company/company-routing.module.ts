import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './candidate/candidate.component';
import { ManageCandidatesComponent } from './manage-candidates/manage-candidates.component';  
import { JobComponent } from './job/job.component';
import { ManageJobsComponent } from './manage-jobs/manage-jobs.component';
import { PostJobComponent } from './post-job/post-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';


const routes: Routes = [

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
  { path: 'dashboard/company-settings',
   component: CompanySettingsComponent },

  { path: 'dashboard/editJob/:id',
   component: EditJobComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
