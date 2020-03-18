import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';

import { PageHeaderModule } from './../../shared';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import { JobdefineComponent } from './jobdefine/jobdefine.component';
import { ReqskillsComponent } from './reqskills/reqskills.component';

@NgModule({
  declarations: [JobComponent, JobdefineComponent, ReqskillsComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    ReactiveFormsModule,
    JobRoutingModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class JobModule { }
