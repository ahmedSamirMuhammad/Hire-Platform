import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCompaniesComponent } from './explore-companies.component';

describe('ExploreCompaniesComponent', () => {
  let component: ExploreCompaniesComponent;
  let fixture: ComponentFixture<ExploreCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreCompaniesComponent]
    });
    fixture = TestBed.createComponent(ExploreCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
