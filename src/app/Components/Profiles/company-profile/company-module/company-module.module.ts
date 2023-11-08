import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyModuleRoutingModule } from './company-module-routing.module';
import { CompanyProfileComponent } from '../company-profile/company-profile.component';
import { CompanyTitlebarComponent } from '../company-titlebar/company-titlebar.component';
import { CompanyAboutComponent } from '../company-about/company-about.component';
import { CompanyOpenjobsComponent } from '../company-openjobs/company-openjobs.component';
import { CompanyReviewsComponent } from '../company-reviews/company-reviews.component';
import { CompanySidebarComponent } from '../company-sidebar/company-sidebar.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
// import { PaginationComponent } from 'src/app/Components/pagination/pagination.component';


@NgModule({
  declarations: [
    CompanyProfileComponent,
		CompanyTitlebarComponent,
		CompanyAboutComponent,
		CompanyOpenjobsComponent,
		CompanyReviewsComponent,
		CompanySidebarComponent,
    // PaginationComponent,
  ],
  imports: [
    CommonModule,
    CompanyModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CompanyModuleModule { }
