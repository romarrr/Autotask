import { TestBed } from '@angular/core/testing';

import { ListTodoResolver } from './list-todo.resolver';

describe('ListTodoResolver', () => {
  let resolver: ListTodoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListTodoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
