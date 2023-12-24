import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewsModalContentComponent } from './edit-reviews-modal-content.component';

describe('EditReviewsModalContentComponent', () => {
  let component: EditReviewsModalContentComponent;
  let fixture: ComponentFixture<EditReviewsModalContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReviewsModalContentComponent]
    });
    fixture = TestBed.createComponent(EditReviewsModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
