import { appReducer } from '@app/store/app.reducer';

import * as AppActions from '@app/store/app.actions';
import { initialStateTest } from '@app/store/tests/app-state-test';
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
    const action = AppActions.loadListOfTripsSuccess({items: trips});
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

});