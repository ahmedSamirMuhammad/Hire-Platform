import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { ExploreCompaniesComponent } from './Components/Explore/explore-companies/explore-companies/explore-companies.component';
import { CompanyProfileComponent } from './Components/Profiles/company-profile/company-profile/company-profile.component';
import { JobProfileComponent } from './Components/Profiles/job-profile/job-profile/job-profile.component';
import { ExploreJobsComponent } from './Components/Explore/explore-jobs/explore-jobs/explore-jobs.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
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
    path: 'explore-jobs',
    component: ExploreJobsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
