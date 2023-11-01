import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTitlebarComponent } from './company-titlebar.component';

describe('CompanyTitlebarComponent', () => {
  let component: CompanyTitlebarComponent;
  let fixture: ComponentFixture<CompanyTitlebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyTitlebarComponent]
    });
    fixture = TestBed.createComponent(CompanyTitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
