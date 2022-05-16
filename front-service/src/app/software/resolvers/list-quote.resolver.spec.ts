import { TestBed } from '@angular/core/testing';

import { ListQuoteResolver } from './list-quote.resolver';

describe('ListQuoteResolver', () => {
  let resolver: ListQuoteResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListQuoteResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
