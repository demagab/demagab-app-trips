import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOfTripsTableComponent } from './list-of-trips-table.component';
import { TripsPagination } from '@app/interfaces/trips-filter.interface';

describe('ListOfTripsTableComponent', () => {
  let component: ListOfTripsTableComponent;
  let fixture: ComponentFixture<ListOfTripsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfTripsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfTripsTableComponent);
    component = fixture.componentInstance;

    component.listOfTrips = [];
    component.pagination = { pageNumber: 1, pageSize: 10 } as TripsPagination;
    component.loading = false;
    component.hasError = false;
    component.listOfTripsNumber = 0;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
