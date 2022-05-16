import { TestBed } from '@angular/core/testing';

import { ListTemplateResolver } from './list-template.resolver';

describe('ListTemplateResolver', () => {
  let resolver: ListTemplateResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListTemplateResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
