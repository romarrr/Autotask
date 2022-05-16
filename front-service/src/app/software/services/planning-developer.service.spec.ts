import { TestBed } from '@angular/core/testing';

import { PlanningDeveloperService } from './planning-developer.service';

describe('PlanningDeveloperService', () => {
  let service: PlanningDeveloperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanningDeveloperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
