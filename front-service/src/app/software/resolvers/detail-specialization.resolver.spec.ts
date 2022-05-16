import { TestBed } from '@angular/core/testing';

import { DetailSpecializationResolver } from './detail-specialization.resolver';

describe('DetailSpecializationResolver', () => {
  let resolver: DetailSpecializationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailSpecializationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
