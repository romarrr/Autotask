import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSpecializationComponent } from './detail-specialization.component';

describe('DetailSpecializationComponent', () => {
  let component: DetailSpecializationComponent;
  let fixture: ComponentFixture<DetailSpecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSpecializationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
