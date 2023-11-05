import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
	declarations: [
  ],
  imports: [
    CommonModule,
	DashboardRoutingModule,
	FormsModule,
  SharedModule
  ]
})
export class DashboardModule { }
