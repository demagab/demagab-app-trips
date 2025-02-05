import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { ListOfTripsComponent } from '@app/components/list-of-trips/list-of-trips.component';
import {
  TripsFilter,
  TripsPagination,
} from '@app/interfaces/trips-filter.interface';
import { AppFacade } from '@app/store/app.facade';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('ListOfTripsComponent', () => {
  let component: ListOfTripsComponent;
  let fixture: ComponentFixture<ListOfTripsComponent>;
  let appFacade: AppFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfTripsComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'trip' } },
            params: of({ id: 'tripId' }),
          },
        },
        {
          provide: Store,
          useValue: {
            select: () => of({}),
            dispatch: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfTripsComponent);
    component = fixture.componentInstance;
    appFacade = TestBed.inject(AppFacade);

    component.listOfTrips$ = of([]);
    component.tripsPagination$ = of({
      pageNumber: 1,
      pageSize: 10,
    } as TripsPagination);
    component.listOfTripsNumber$ = of(0);
    component.listOfTripsIsLoading$ = of(false);
    component.listOfTripsHasError$ = of(false);

    component.tripOfTheDay$ = of(undefined);
    component.tripOfTheDayIsLoading$ = of(false);
    component.tripOfTheDayHasError$ = of(false);

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`onFilterChange`, () => {
    it(`should call setListOfTripsPagination with items`, () => {
      const filter: TripsFilter = { title: 'titleFilter', minimumPrice: 1000 };
      const spyOnService = spyOn(appFacade, 'setListOfTripsPagination');

      component.onFilterChange(filter);

      expect(spyOnService).toHaveBeenCalledWith({ filter: filter }, true);
    });

    it(`should call setListOfTripsPagination with empty filter when items are not defined`, () => {
      const filter: TripsFilter = { title: '', minimumPrice: undefined };
      const spyOnService = spyOn(appFacade, 'setListOfTripsPagination');

      component.onFilterChange(filter);

      expect(spyOnService).toHaveBeenCalledWith({ filter: {} }, true);
    });

    it(`should call setListOfTripsPagination with empty filter when empty`, () => {
      const filter: TripsFilter = {};
      const spyOnService = spyOn(appFacade, 'setListOfTripsPagination');

      component.onFilterChange(filter);

      expect(spyOnService).toHaveBeenCalledWith({ filter: {} }, true);
    });
  });
});
