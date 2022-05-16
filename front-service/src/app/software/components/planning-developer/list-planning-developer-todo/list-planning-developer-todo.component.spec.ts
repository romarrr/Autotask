import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanningDeveloperTodoComponent } from './list-planning-developer-todo.component';

describe('ListPlanningDeveloperTodoComponent', () => {
  let component: ListPlanningDeveloperTodoComponent;
  let fixture: ComponentFixture<ListPlanningDeveloperTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPlanningDeveloperTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlanningDeveloperTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
