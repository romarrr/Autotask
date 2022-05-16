import { TestBed } from '@angular/core/testing';

import { ListPlanningResolver } from './list-planning.resolver';

describe('ListPlanningResolver', () => {
  let resolver: ListPlanningResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListPlanningResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
