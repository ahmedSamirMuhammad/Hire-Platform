import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAboutComponent } from './company-about.component';

describe('CompanyAboutComponent', () => {
  let component: CompanyAboutComponent;
  let fixture: ComponentFixture<CompanyAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAboutComponent]
    });
    fixture = TestBed.createComponent(CompanyAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
