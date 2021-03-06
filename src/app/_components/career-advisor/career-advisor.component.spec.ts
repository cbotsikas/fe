import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerAdvisorComponent } from './career-advisor.component';
import { TranslateModule } from "@ngx-translate/core";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {MatDatepickerModule} from '@angular/material/datepicker';
//import {MatNativeDateModule} from '@angular/material/core';
import { RouterTestingModule } from '@angular/router/testing';
//import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CareerAdvisorComponent', () => {
  let component: CareerAdvisorComponent;
  let fixture: ComponentFixture<CareerAdvisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerAdvisorComponent ],
      imports: [
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
        ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
