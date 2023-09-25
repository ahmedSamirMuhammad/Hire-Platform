import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./Components/Dashboard/dashboard/dashboard.component";
import { ExploreCompaniesComponent } from './Components/Explore/explore-companies/explore-companies/explore-companies.component';
import { CompanyProfileComponent } from './Components/Profiles/company-profile/company-profile/company-profile.component';

const routes: Routes = [
	{
		path: 'dashboard',
		component:DashboardComponent
	}

  {
    path: 'explore-companies',
    component: ExploreCompaniesComponent,
  },
  {
    path: 'company-profile',
    component: CompanyProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
