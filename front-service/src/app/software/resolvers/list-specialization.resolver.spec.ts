import { TestBed } from '@angular/core/testing';

import { ListSpecializationResolver } from './list-specialization.resolver';

describe('ListSpecializationResolver', () => {
  let resolver: ListSpecializationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListSpecializationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
