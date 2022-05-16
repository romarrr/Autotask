import { TestBed } from '@angular/core/testing';

import { DetailUserResolver } from './detail-user.resolver';

describe('DetailUserResolver', () => {
  let resolver: DetailUserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailUserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
