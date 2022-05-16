import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlanningComponent } from './create-planning.component';

describe('CreatePlanningComponent', () => {
  let component: CreatePlanningComponent;
  let fixture: ComponentFixture<CreatePlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
