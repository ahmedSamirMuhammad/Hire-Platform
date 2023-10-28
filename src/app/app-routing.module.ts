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
// import { UserProfileComponent } from './Components/Profiles/user-profile/user-profile.component';
import {SearchResultsComponent} from './Components/search-results/search-results.component';

const routes: Routes = [
  {
    path: '',
    loadChildren:()=>import('./Components/Home/index/index.module').then(m=>m.IndexModule)
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
    path: 'user-profile/:id',

    loadChildren:()=>import('./Components/Profiles/user-profile/user-profile.module').then(m=>m.UserProfileModule)
  },
  {
    path: 'explore-jobs',
    component: ExploreJobsComponent,
  },
  {
    path: 'search-results',
    component: SearchResultsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
