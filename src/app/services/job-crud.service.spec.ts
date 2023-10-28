import { TestBed } from '@angular/core/testing';

import { JobCrudService } from './job-crud.service';

describe('JobCrudService', () => {
  let service: JobCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
