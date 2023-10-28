import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { JobCategoriesComponent } from '../job-categories/job-categories.component';
import { JobsComponent } from '../jobs/jobs.component';
import { CitiesComponent } from '../cities/cities.component';
import { PaymentPlansComponent } from '../payment-plans/payment-plans.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    IndexComponent,
    JobCategoriesComponent,
    JobsComponent,
    CitiesComponent,
    PaymentPlansComponent,
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    FormsModule
  ]
})
export class IndexModule { }
