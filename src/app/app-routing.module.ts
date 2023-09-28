import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { JobProfileComponent } from './Components/Profiles/job-profile/job-profile.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { Error404Component } from './Components/ErrorComponents/error404/error404.component';
import { IndexComponent } from './Components/Home/index/index.component';

const routes: Routes = [
  {
    path:'',
    component:IndexComponent
  },
{
  path:'profile',
  component:JobProfileComponent
},

{
  path:'contact-us',
  component:ContactUsComponent 
},
{
  path:'error404',
  component:Error404Component
},
=======
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
    path: 'company-profile',
    component: CompanyProfileComponent,
  },
  {
    path: 'job-profile',
    component: JobProfileComponent,
  },
  {
    path: 'explore-jobs',
    component: ExploreJobsComponent,
  },
>>>>>>> 06e818db200877be7a69fb8942f78c33b30db67d
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
