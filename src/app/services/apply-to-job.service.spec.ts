import { TestBed } from '@angular/core/testing';

import { ApplyToJobService } from './apply-to-job.service';

describe('ApplyToJobService', () => {
  let service: ApplyToJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyToJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
