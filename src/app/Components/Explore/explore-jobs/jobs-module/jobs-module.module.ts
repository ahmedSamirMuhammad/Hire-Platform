import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsModuleRoutingModule } from './jobs-module-routing.module';
import { ExploreJobsComponent } from '../explore-jobs/explore-jobs.component';
import { MatchedJobsComponent } from '../matched-jobs/matched-jobs.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { PaginationComponent } from 'src/app/Components/pagination/pagination.component';

@NgModule({
  declarations: [
    ExploreJobsComponent,
    MatchedJobsComponent,
    // PaginationComponent,
  ],
  imports: [
    CommonModule,
    JobsModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JobsModuleModule { }
