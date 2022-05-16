import { TestBed } from '@angular/core/testing';

import { DetailProjectResolver } from './detail-project.resolver';

describe('DetailProjectResolver', () => {
  let resolver: DetailProjectResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailProjectResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
