import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailQuoteComponent } from './detail-quote.component';

describe('DetailQuoteComponent', () => {
  let component: DetailQuoteComponent;
  let fixture: ComponentFixture<DetailQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
