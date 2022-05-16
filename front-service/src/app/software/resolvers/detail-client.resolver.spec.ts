import { TestBed } from '@angular/core/testing';

import { DetailClientResolver } from './detail-client.resolver';

describe('DetailClientResolver', () => {
  let resolver: DetailClientResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailClientResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
