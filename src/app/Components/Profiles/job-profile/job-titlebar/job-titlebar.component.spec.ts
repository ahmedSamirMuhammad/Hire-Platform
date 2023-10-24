import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitlebarComponent } from './job-titlebar.component';

describe('JobTitlebarComponent', () => {
  let component: JobTitlebarComponent;
  let fixture: ComponentFixture<JobTitlebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobTitlebarComponent]
    });
    fixture = TestBed.createComponent(JobTitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
