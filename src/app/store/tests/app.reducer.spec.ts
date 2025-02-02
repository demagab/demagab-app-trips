import { appReducer } from '@app/store/app.reducer';

import * as AppActions from '@app/store/app.actions';
import {
  initialStateTest,
  mockTrip1,
  mockTrip2,
} from '@app/store/tests/app-state-test';
import { TripDef } from '@app/interfaces/trip-def.interface';
import { TripsPagination } from '@app/interfaces/trips-filter.interface';
import { initialState } from '@app/store/app.state';

describe(`AppReducer`, () => {
  describe(`setListOfTripsPagination`, () => {
    it(`should reset the pagination`, () => {
      const pagination = undefined;
      const action = AppActions.setListOfTripsPagination({ pagination });
      const state = appReducer(initialStateTest, action);

      expect(state.listOfTrips.pagination).toBe(
        initialState.listOfTrips.pagination,
      );
    });

    it(`should set the pagination`, () => {
      const pagination: TripsPagination = {
        pageNumber: 0,
        pageSize: 0,
        filter: {
          tags: ['test'],
        },
      };
      const action = AppActions.setListOfTripsPagination({ pagination });
      const state = appReducer(initialStateTest, action);

      expect(state.listOfTrips.pagination).toBe(pagination);
    });
  });

  it(`should handle loadListOfTripsRequest`, () => {
    const action = AppActions.loadListOfTripsRequest();
    const state = appReducer(initialStateTest, action);

    expect(state.listOfTrips.items).toBe(initialStateTest.listOfTrips.items);
    expect(state.listOfTrips.isLoading).toBeTrue();
    expect(state.listOfTrips.hasError).toBeFalse();
  });

  it(`should handle loadListOfTripsSuccess`, () => {
    const trips: TripDef[] = [];
    const action = AppActions.loadListOfTripsSuccess({ items: trips });
    const state = appReducer(initialStateTest, action);

    expect(state.listOfTrips.items).toBe(trips);
    expect(state.listOfTrips.isLoading).toBeFalse();
    expect(state.listOfTrips.hasError).toBeFalse();
  });

  it(`should handle loadListOfTripsFailure`, () => {
    const action = AppActions.loadListOfTripsFailure();
    const state = appReducer(initialStateTest, action);

    expect(state.listOfTrips.items).toBe(initialStateTest.listOfTrips.items);
    expect(state.listOfTrips.isLoading).toBeFalse();
    expect(state.listOfTrips.hasError).toBeTrue();
  });

  describe(`loadTripDetailsRequest`, () => {
    it(`should prepolutate trip detail with preloaded trip information from list when available`, () => {
      const trip: TripDef = mockTrip1;
      const action = AppActions.loadTripDetailsRequest({ itemId: trip.id });
      const state = appReducer(
        {
          ...initialStateTest,
          listOfTrips: { ...initialStateTest.listOfTrips, items: [mockTrip1] },
        },
        action,
      );

      expect(state.selectedTrip.item!.description).toEqual(trip.description);
      expect(state.selectedTrip.item).not.toBe(trip);
      expect(state.selectedTrip.isLoading).toBeTrue();
      expect(state.selectedTrip.hasError).toBeFalse();
    });

    it(`should not prepolutate trip detail with preloaded trip information from list when not available`, () => {
      const trip: TripDef = mockTrip2;
      const action = AppActions.loadTripDetailsRequest({ itemId: trip.id });
      const state = appReducer(
        {
          ...initialStateTest,
          listOfTrips: { ...initialStateTest.listOfTrips, items: [mockTrip1] },
        },
        action,
      );

      expect(state.selectedTrip.item).toBeUndefined();
      expect(state.selectedTrip.isLoading).toBeTrue();
      expect(state.selectedTrip.hasError).toBeFalse();
    });

    it(`should not prepolutate trip detail with preloaded trip information when list is empty`, () => {
      const action = AppActions.loadTripDetailsRequest({
        itemId: mockTrip2.id,
      });
      const state = appReducer(
        {
          ...initialStateTest,
          listOfTrips: { ...initialStateTest.listOfTrips, items: [] },
        },
        action,
      );

      expect(state.selectedTrip.item).toBeUndefined();
      expect(state.selectedTrip.isLoading).toBeTrue();
      expect(state.selectedTrip.hasError).toBeFalse();
    });
  });

  it(`should handle loadTripDetailsSuccess`, () => {
    const trip: TripDef = mockTrip1;
    const action = AppActions.loadTripDetailsSuccess({ item: trip });
    const state = appReducer(initialStateTest, action);

    expect(state.selectedTrip.item).toBe(trip);
    expect(state.selectedTrip.isLoading).toBeFalse();
    expect(state.selectedTrip.hasError).toBeFalse();
  });

  it(`should handle loadTripDetailsFailure`, () => {
    const action = AppActions.loadTripDetailsFailure();
    const state = appReducer(initialStateTest, action);

    expect(state.selectedTrip.item).toBe(initialStateTest.selectedTrip.item);
    expect(state.selectedTrip.isLoading).toBeFalse();
    expect(state.selectedTrip.hasError).toBeTrue();
  });

  it(`should handle loadTripOfTheDayRequest`, () => {
    const action = AppActions.loadTripOfTheDayRequest();
    const state = appReducer(initialStateTest, action);

    expect(state.tripOfTheDay.item).toBe(initialStateTest.selectedTrip.item);
    expect(state.tripOfTheDay.isLoading).toBeFalse();
    expect(state.tripOfTheDay.hasError).toBeTrue();
  });

  it(`should handle loadTripOfTheDaySuccess`, () => {
    const trip: TripDef = mockTrip1;
    const action = AppActions.loadTripOfTheDaySuccess({ item: trip });
    const state = appReducer(initialStateTest, action);

    expect(state.tripOfTheDay.item).toBe(trip);
    expect(state.tripOfTheDay.isLoading).toBeFalse();
    expect(state.tripOfTheDay.hasError).toBeFalse();
  });

  it(`should handle loadTripOfTheDayFailure`, () => {
    const action = AppActions.loadTripOfTheDayFailure();
    const state = appReducer(initialStateTest, action);

    expect(state.tripOfTheDay.item).toBe(initialStateTest.selectedTrip.item);
    expect(state.tripOfTheDay.isLoading).toBeFalse();
    expect(state.tripOfTheDay.hasError).toBeTrue();
  });
});
