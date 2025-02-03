import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTripsTableComponent } from './list-of-trips-table.component';

describe('ListOfTripsTableComponent', () => {
  let component: ListOfTripsTableComponent;
  let fixture: ComponentFixture<ListOfTripsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfTripsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfTripsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
