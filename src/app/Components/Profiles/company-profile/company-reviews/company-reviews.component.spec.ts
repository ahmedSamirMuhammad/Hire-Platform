import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyReviewsComponent } from './company-reviews.component';

describe('CompanyReviewsComponent', () => {
  let component: CompanyReviewsComponent;
  let fixture: ComponentFixture<CompanyReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyReviewsComponent]
    });
    fixture = TestBed.createComponent(CompanyReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
