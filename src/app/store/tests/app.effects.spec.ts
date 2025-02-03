import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { TripsDataService } from '@app/services/trips-data.service';
import { mockTrip1, mockTrip2 } from '@app/store/tests/app-state-test';
import * as AppActions from '@app/store/app.actions';
import * as AppSelectors from '@app/store/app.selectors';
import { AppEffects } from '@app/store/app.effects';
import { AppState } from '@app/store/app.state';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import {
  TripsFilterSortProperty,
  TripsPagination,
} from '@app/interfaces/trips-filter.interface';
import { PersistanceService } from '@app/services/persistance.service';

describe(`AppEffects`, () => {
  let effects: AppEffects;

  let actions$: Observable<Action>;
  let mockStore$: MockStore<AppState>;

  let tripsDataService: TripsDataService;
  let persistanceService: PersistanceService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        provideMockStore<AppState>(),
        provideHttpClient(),
      ],
      declarations: [],
    });

    effects = TestBed.inject(AppEffects);
    mockStore$ = TestBed.inject(Store) as unknown as MockStore<AppState>;

    tripsDataService = TestBed.inject(TripsDataService);
    persistanceService = TestBed.inject(PersistanceService);
  }));

  it(`should dispatch setListOfTripsPagination$`, () => {
    const payload = { items: [], itemsNumber: 0 };
    const action = AppActions.loadListOfTripsRequest();
    const outcome = AppActions.loadListOfTripsSuccess(payload);

    const mockPagination: TripsPagination = {
      pageNumber: 0,
      pageSize: 0,
      sortProperty: TripsFilterSortProperty.title,
      sortDescending: false,
    };

    mockStore$.overrideSelector(
      AppSelectors.selectListOfTripsPagination,
      mockPagination,
    );

    const spyOnService = spyOn(tripsDataService, 'getTrips$').and.returnValue(
      of({
        items: [],
        limit: 0,
        page: 0,
        total: 0,
      }),
    );

    actions$ = hot('-a', { a: action });
    const expected$ = cold('-b', { b: outcome });

    expect(effects.loadListOfTrips$).toBeObservable(expected$);
    expect(spyOnService).toHaveBeenCalledOnceWith(mockPagination);
  });

  describe(`loadListOfTrips`, () => {
    it(`should dispatch loadListOfTripsSuccess with an empty list`, () => {
      const payload = { items: [], itemsNumber: 0 };
      const action = AppActions.loadListOfTripsRequest();
      const outcome = AppActions.loadListOfTripsSuccess(payload);

      const mockPagination: TripsPagination = {
        pageNumber: 0,
        pageSize: 0,
        sortProperty: TripsFilterSortProperty.title,
        sortDescending: false,
      };

      mockStore$.overrideSelector(
        AppSelectors.selectListOfTripsPagination,
        mockPagination,
      );

      const spyOnService = spyOn(tripsDataService, 'getTrips$').and.returnValue(
        of({
          items: [],
          limit: 0,
          page: 0,
          total: 0,
        }),
      );

      actions$ = hot('-a', { a: action });
      const expected$ = cold('-b', { b: outcome });

      expect(effects.loadListOfTrips$).toBeObservable(expected$);
      expect(spyOnService).toHaveBeenCalledOnceWith(mockPagination);
    });

    it(`should dispatch loadListOfTripsSuccess with a list of items`, () => {
      const payload = { items: [mockTrip1, mockTrip2], itemsNumber: 2 };
      const action = AppActions.loadListOfTripsRequest();
      const outcome = AppActions.loadListOfTripsSuccess(payload);

      const mockPagination: TripsPagination = {
        pageNumber: 0,
        pageSize: 0,
        sortProperty: TripsFilterSortProperty.title,
        sortDescending: false,
      };

      mockStore$.overrideSelector(
        AppSelectors.selectListOfTripsPagination,
        mockPagination,
      );

      const spyOnService = spyOn(tripsDataService, 'getTrips$').and.returnValue(
        of({
          items: [mockTrip1, mockTrip2],
          limit: 0,
          page: 0,
          total: 2,
        }),
      );

      actions$ = hot('-a', { a: action });
      const expected$ = cold('-b', { b: outcome });

      expect(effects.loadListOfTrips$).toBeObservable(expected$);
      expect(spyOnService).toHaveBeenCalledOnceWith(mockPagination);
    });

    it(`should dispatch loadListOfTripsFailure`, () => {
      const action = AppActions.loadListOfTripsRequest();
      const outcome = AppActions.loadListOfTripsFailure();

      const mockPagination: TripsPagination = {
        pageNumber: 0,
        pageSize: 0,
        sortProperty: TripsFilterSortProperty.title,
        sortDescending: false,
      };

      mockStore$.overrideSelector(
        AppSelectors.selectListOfTripsPagination,
        mockPagination,
      );

      const spyOnService = spyOn(tripsDataService, 'getTrips$').and.returnValue(
        throwError(() => new HttpErrorResponse({})),
      );

      actions$ = hot('-a', { a: action });
      const expected$ = cold('-b', { b: outcome });

      expect(effects.loadListOfTrips$).toBeObservable(expected$);
      expect(spyOnService).toHaveBeenCalledOnceWith(mockPagination);
    });
  });

  describe(`loadTripDetails`, () => {
    it(`should dispatch loadTripDetailsSuccess with an item`, () => {
      const payload = { item: mockTrip1 };
      const action = AppActions.loadTripDetailsRequest({
        itemId: mockTrip1.id,
      });
      const outcome = AppActions.loadTripDetailsSuccess(payload);

      const spyOnService = spyOn(
        tripsDataService,
        'getTripById$',
      ).and.returnValue(of(mockTrip1));

      actions$ = hot('-a', { a: action });
      const expected$ = cold('-b', { b: outcome });

      expect(effects.loadTripDetails$).toBeObservable(expected$);
      expect(spyOnService).toHaveBeenCalledOnceWith(mockTrip1.id);
    });

    it(`should dispatch loadListOfTripsFailure`, () => {
      const action = AppActions.loadTripDetailsRequest({
        itemId: 'unknown-trip',
      });
      const outcome = AppActions.loadTripDetailsFailure();

      spyOn(tripsDataService, 'getTripById$').and.returnValue(
        throwError(() => new HttpErrorResponse({})),
      );

      actions$ = hot('-a', { a: action });
      const expected$ = cold('-b', { b: outcome });

      expect(effects.loadTripDetails$).toBeObservable(expected$);
    });
  });

  describe(`loadTripDetails`, () => {
    it(`should dispatch loadTripOfTheDaySuccess with an item with a new trip of the day`, () => {
      const payload = { item: mockTrip1 };
      const action = AppActions.loadTripOfTheDayRequest();
      const outcome = AppActions.loadTripOfTheDaySuccess(payload);

      spyOn(persistanceService, 'retrieveTripId').and.returnValue(null);

      const spyOnService = spyOn(
        tripsDataService,
        'getTripOfTheDay$',
      ).and.returnValue(of(mockTrip1));

      actions$ = hot('-a', { a: action });
      const expected$ = cold('-b', { b: outcome });

      expect(effects.loadTripOfTheDay$).toBeObservable(expected$);
      expect(spyOnService).toHaveBeenCalled();
    });

    it(`should dispatch loadTripOfTheDaySuccess with an item with the existing trip of the day`, () => {
      const payload = { item: mockTrip1 };
      const action = AppActions.loadTripOfTheDayRequest();
      const outcome = AppActions.loadTripOfTheDaySuccess(payload);

      spyOn(persistanceService, 'retrieveTripId').and.returnValue(mockTrip1.id);

      const spyOnService = spyOn(
        tripsDataService,
        'getTripById$',
      ).and.returnValue(of(mockTrip1));

      actions$ = hot('-a', { a: action });
      const expected$ = cold('-b', { b: outcome });

      expect(effects.loadTripOfTheDay$).toBeObservable(expected$);
      expect(spyOnService).toHaveBeenCalledOnceWith(mockTrip1.id);
    });

    it(`should dispatch loadTripOfTheDayFailure with a new trip of the day`, () => {
      const action = AppActions.loadTripOfTheDayRequest();
      const outcome = AppActions.loadTripOfTheDayFailure();

      spyOn(persistanceService, 'retrieveTripId').and.returnValue(null);

      spyOn(tripsDataService, 'getTripOfTheDay$').and.returnValue(
        throwError(() => new HttpErrorResponse({})),
      );

      actions$ = hot('-a', { a: action });
      const expected$ = cold('-b', { b: outcome });

      expect(effects.loadTripOfTheDay$).toBeObservable(expected$);
    });

    it(`should dispatch loadTripOfTheDayFailure with the existing trip of the day`, () => {
      const action = AppActions.loadTripOfTheDayRequest();
      const outcome = AppActions.loadTripOfTheDayFailure();

      spyOn(persistanceService, 'retrieveTripId').and.returnValue('id');

      spyOn(tripsDataService, 'getTripById$').and.returnValue(
        throwError(() => new HttpErrorResponse({})),
      );

      actions$ = hot('-a', { a: action });
      const expected$ = cold('-b', { b: outcome });

      expect(effects.loadTripOfTheDay$).toBeObservable(expected$);
    });
  });
});
