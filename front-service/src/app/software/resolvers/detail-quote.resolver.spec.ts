import { TestBed } from '@angular/core/testing';

import { DetailQuoteResolver } from './detail-quote.resolver';

describe('DetailQuoteResolver', () => {
  let resolver: DetailQuoteResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailQuoteResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
