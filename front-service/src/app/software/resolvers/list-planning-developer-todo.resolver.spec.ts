import { TestBed } from '@angular/core/testing';

import { ListPlanningDeveloperTodoResolver } from './list-planning-developer-todo.resolver';

describe('ListPlanningDeveloperTodoResolver', () => {
  let resolver: ListPlanningDeveloperTodoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListPlanningDeveloperTodoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
