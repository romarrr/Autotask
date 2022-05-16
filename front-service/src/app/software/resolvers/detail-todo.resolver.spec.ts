import { TestBed } from '@angular/core/testing';

import { DetailTodoResolver } from './detail-todo.resolver';

describe('DetailTodoResolver', () => {
  let resolver: DetailTodoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailTodoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
