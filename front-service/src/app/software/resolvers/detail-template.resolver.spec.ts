import { TestBed } from '@angular/core/testing';

import { DetailTemplateResolver } from './detail-template.resolver';

describe('DetailTemplateResolver', () => {
  let resolver: DetailTemplateResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailTemplateResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
