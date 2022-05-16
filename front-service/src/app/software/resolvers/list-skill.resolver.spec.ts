import { TestBed } from '@angular/core/testing';

import { ListSkillResolver } from './list-skill.resolver';

describe('ListSkillResolver', () => {
  let resolver: ListSkillResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListSkillResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
