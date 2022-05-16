import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPlanningDeveloperTodoComponent } from './detail-planning-developer-todo.component';

describe('DetailPlanningDeveloperTodoComponent', () => {
  let component: DetailPlanningDeveloperTodoComponent;
  let fixture: ComponentFixture<DetailPlanningDeveloperTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPlanningDeveloperTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPlanningDeveloperTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
