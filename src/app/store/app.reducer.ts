import { createReducer, on } from '@ngrx/store';
import * as AppActions from '@app/store/app.actions';
import { initialState } from '@app/store/app.state';
import { TripDef } from '@app/interfaces/trip-def.interface';

export const appReducer = createReducer(
  initialState,

  on(AppActions.setListOfTripsPagination, (state, { pagination }) => ({
    ...state,
    listOfTrips: {
      ...state.listOfTrips,
      pagination: pagination ?? initialState.listOfTrips.pagination,
    },
  })),

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

  on(AppActions.loadTripDetailsRequest, (state, { itemId }) => {
    const tripOverview = state.listOfTrips.items.find((it) => it.id === itemId);
    const preloadedTripOverview: TripDef | undefined = tripOverview && {
      ...tripOverview,
    };

    return {
      ...state,
      selectedTrip: {
        ...state.selectedTrip,
        item: preloadedTripOverview,
        isLoading: true,
        hasError: false,
      },
    };
  }),

  on(AppActions.loadTripDetailsSuccess, (state, { item }) => ({
    ...state,
    selectedTrip: {
      ...state.selectedTrip,
      item: item,
      isLoading: false,
      hasError: false,
    },
  })),

  on(AppActions.loadTripDetailsFailure, (state) => ({
    ...state,
    selectedTrip: {
      ...state.selectedTrip,
      isLoading: false,
      hasError: true,
    },
  })),

  on(AppActions.loadTripOfTheDayRequest, (state) => ({
    ...state,
    tripOfTheDay: {
      ...state.selectedTrip,
      isLoading: false,
      hasError: false,
    },
  })),

  on(AppActions.loadTripOfTheDaySuccess, (state, { item }) => ({
    ...state,
    tripOfTheDay: {
      ...state.selectedTrip,
      item: item,
      isLoading: false,
      hasError: false,
    },
  })),

  on(AppActions.loadTripOfTheDayFailure, (state) => ({
    ...state,
    tripOfTheDay: {
      ...state.selectedTrip,
      isLoading: false,
      hasError: true,
    },
  })),
);
