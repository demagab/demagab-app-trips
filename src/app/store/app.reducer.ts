import { createReducer, on } from '@ngrx/store';
import * as AppActions from '@app/store/app.actions';
import { initialState } from '@app/store/app.state';

export const appReducer = createReducer(
  initialState,

  on(AppActions.loadListOfTripsRequest, (state) => ({
    ...state,
    listOfTrips: {
      ...state.listOfTrips,
      isLoading: true,
      hasError: false,
    },
  })),

  on(AppActions.loadListOfTripsSuccess, (state, { items }) => ({
    ...state,
    listOfTrips: {
      ...state.listOfTrips,
      items: items,
      isLoading: false,
    },
  })),

  on(AppActions.loadListOfTripsFailure, (state) => ({
    ...state,
    listOfTrips: {
      ...state.listOfTrips,
      isLoading: false,
      hasError: true,
    },
  })),
);
