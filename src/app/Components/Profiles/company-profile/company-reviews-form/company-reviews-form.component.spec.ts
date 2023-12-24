import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyReviewsFormComponent } from './company-reviews-form.component';

describe('CompanyReviewsFormComponent', () => {
  let component: CompanyReviewsFormComponent;
  let fixture: ComponentFixture<CompanyReviewsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyReviewsFormComponent]
    });
    fixture = TestBed.createComponent(CompanyReviewsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
