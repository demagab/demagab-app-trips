import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOfTheDayComponent } from './trip-of-the-day.component';

describe('TripOfTheDayComponent', () => {
  let component: TripOfTheDayComponent;
  let fixture: ComponentFixture<TripOfTheDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripOfTheDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
