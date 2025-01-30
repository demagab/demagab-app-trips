import { appReducer } from '@app/store/app.reducer';

import * as AppActions from '@app/store/app.actions';
import {
  initialStateTest,
  mockTrip1,
  mockTrip2,
} from '@app/store/tests/app-state-test';
import { TripDef } from '@app/interfaces/trip-def.interface';

describe(`AppReducer`, () => {
  it(`should handle loadListOfTripsRequest`, () => {
    const action = AppActions.loadListOfTripsRequest();
    const state = appReducer(initialStateTest, action);

    expect(state.listOfTrips.items).toEqual(initialStateTest.listOfTrips.items);
    expect(state.listOfTrips.isLoading).toBeTrue();
    expect(state.listOfTrips.hasError).toBeFalse();
  });

  it(`should handle loadListOfTripsSuccess`, () => {
    const trips: TripDef[] = [];
    const action = AppActions.loadListOfTripsSuccess({ items: trips });
    const state = appReducer(initialStateTest, action);

    expect(state.listOfTrips.items).toEqual(trips);
    expect(state.listOfTrips.isLoading).toBeFalse();
    expect(state.listOfTrips.hasError).toBeFalse();
  });

  it(`should handle loadListOfTripsFailure`, () => {
    const action = AppActions.loadListOfTripsFailure();
    const state = appReducer(initialStateTest, action);

    expect(state.listOfTrips.items).toEqual(initialStateTest.listOfTrips.items);
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

    expect(state.selectedTrip.item).toEqual(initialStateTest.selectedTrip.item);
    expect(state.selectedTrip.isLoading).toBeFalse();
    expect(state.selectedTrip.hasError).toBeTrue();
  });
});
