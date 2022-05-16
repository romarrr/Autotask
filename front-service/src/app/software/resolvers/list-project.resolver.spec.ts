import { TestBed } from '@angular/core/testing';

import { ListProjectResolver } from './list-project.resolver';

describe('ListProjectResolver', () => {
  let resolver: ListProjectResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListProjectResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
