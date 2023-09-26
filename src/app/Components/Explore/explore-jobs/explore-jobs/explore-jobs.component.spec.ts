import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreJobsComponent } from './explore-jobs.component';

describe('ExploreJobsComponent', () => {
  let component: ExploreJobsComponent;
  let fixture: ComponentFixture<ExploreJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreJobsComponent]
    });
    fixture = TestBed.createComponent(ExploreJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
