import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTripsFilterComponent } from './list-of-trips-filter.component';

describe('ListOfTripsFilterComponent', () => {
  let component: ListOfTripsFilterComponent;
  let fixture: ComponentFixture<ListOfTripsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfTripsFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfTripsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
