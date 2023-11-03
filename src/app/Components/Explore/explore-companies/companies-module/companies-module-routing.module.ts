import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreCompaniesComponent } from '../explore-companies/explore-companies.component';

const routes: Routes = [

  {path: "", component: ExploreCompaniesComponent} ,

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesModuleRoutingModule { }
