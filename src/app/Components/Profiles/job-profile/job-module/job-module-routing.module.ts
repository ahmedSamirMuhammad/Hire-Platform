import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobProfileComponent } from '../job-profile/job-profile.component';

const routes: Routes = [
  {path: "", component: JobProfileComponent} ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobModuleRoutingModule { }
