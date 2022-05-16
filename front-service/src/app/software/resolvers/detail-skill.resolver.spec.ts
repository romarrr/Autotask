import { TestBed } from '@angular/core/testing';

import { DetailSkillResolver } from './detail-skill.resolver';

describe('DetailSkillResolver', () => {
  let resolver: DetailSkillResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailSkillResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
