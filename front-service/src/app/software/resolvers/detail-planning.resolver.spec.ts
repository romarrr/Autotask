import { TestBed } from '@angular/core/testing';

import { DetailPlanningResolver } from './detail-planning.resolver';

describe('DetailPlanningResolver', () => {
  let resolver: DetailPlanningResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailPlanningResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
