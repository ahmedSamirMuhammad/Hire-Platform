import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesModuleRoutingModule } from './companies-module-routing.module';
import { ExploreCompaniesComponent } from '../explore-companies/explore-companies.component';
import { LettersListComponent } from '../letters-list/letters-list.component';
import { CompaniesListComponent } from '../companies-list/companies-list.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { PaginationComponent } from 'src/app/Components/pagination/pagination.component';

@NgModule({
  declarations: [
    ExploreCompaniesComponent,
    CompaniesListComponent,
    LettersListComponent,
    // PaginationComponent,
  ],
  imports: [
    CommonModule,
    CompaniesModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CompaniesModuleModule { }
