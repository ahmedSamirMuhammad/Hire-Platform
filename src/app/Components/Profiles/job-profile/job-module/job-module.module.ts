import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobModuleRoutingModule } from './job-module-routing.module';
import { JobProfileComponent } from '../job-profile/job-profile.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JobTitlebarComponent } from '../job-titlebar/job-titlebar.component';
import { JobDescriptionComponent } from '../job-description/job-description.component';
import { JobSidebarComponent } from '../job-sidebar/job-sidebar.component';
// import { PaginationComponent } from 'src/app/Components/pagination/pagination.component';

@NgModule({
  declarations: [
    JobProfileComponent,
    JobTitlebarComponent,
		JobDescriptionComponent,
		JobSidebarComponent,
    // PaginationComponent,

  ],
  imports: [
    CommonModule,
    JobModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JobModuleModule { }
