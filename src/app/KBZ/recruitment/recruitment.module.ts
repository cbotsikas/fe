import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { RecruitmentComponent } from './recruitment.component';
import { PageHeaderModule } from './../../shared';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [RecruitmentComponent],
  imports: [
    CommonModule,RecruitmentRoutingModule,PageHeaderModule,DataTablesModule
  ]
})
export class RecruitmentModule { }
