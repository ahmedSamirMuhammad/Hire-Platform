import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreJobsComponent } from '../explore-jobs/explore-jobs.component';
const routes: Routes = [
  
{path: "", component: ExploreJobsComponent} ,

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsModuleRoutingModule { }
