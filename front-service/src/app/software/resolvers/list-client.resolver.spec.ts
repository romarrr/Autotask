import { TestBed } from '@angular/core/testing';
import { ListClientResolver } from './list-client.resolver';

describe('ListClientResolver', () => {
  let resolver: ListClientResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListClientResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
