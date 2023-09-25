import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOpenjobsComponent } from './company-openjobs.component';

describe('CompanyOpenjobsComponent', () => {
  let component: CompanyOpenjobsComponent;
  let fixture: ComponentFixture<CompanyOpenjobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyOpenjobsComponent]
    });
    fixture = TestBed.createComponent(CompanyOpenjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
