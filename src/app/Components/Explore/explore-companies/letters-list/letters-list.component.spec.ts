import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersListComponent } from './letters-list.component';

describe('LettersListComponent', () => {
  let component: LettersListComponent;
  let fixture: ComponentFixture<LettersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LettersListComponent]
    });
    fixture = TestBed.createComponent(LettersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
