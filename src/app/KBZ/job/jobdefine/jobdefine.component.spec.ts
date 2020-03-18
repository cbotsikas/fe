import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdefineComponent } from './jobdefine.component';

describe('JobdefineComponent', () => {
  let component: JobdefineComponent;
  let fixture: ComponentFixture<JobdefineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobdefineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobdefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
