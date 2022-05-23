import { TestBed } from '@angular/core/testing';

import { DetailPlanningDeveloperTodoResolver } from './detail-planning-developer-todo.resolver';

describe('DetailPlanningDeveloperTodoResolver', () => {
  let resolver: DetailPlanningDeveloperTodoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailPlanningDeveloperTodoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
