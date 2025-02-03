import { createReducer, on } from '@ngrx/store';
import * as AppActions from '@app/store/app.actions';
import { initialState } from '@app/store/app.state';
import { TripDef } from '@app/interfaces/trip-def.interface';
import { TripsPagination } from '@app/interfaces/trips-filter.interface';

export const appReducer = createReducer(
  initialState,

  on(
    AppActions.setListOfTripsPagination,
    (state, { pagination, forceFilter }) => {
      const newPagination: TripsPagination = {
        ...state.listOfTrips.pagination,
        ...pagination,
        filter: {
          ...(forceFilter
            ? initialState.listOfTrips.pagination.filter
            : state.listOfTrips.pagination.filter),
          ...pagination.filter,
        },
      };

      return {
        ...state,
        listOfTrips: {
          ...state.listOfTrips,
          pagination: newPagination,
        },
      };
    },
  ),

  on(AppActions.loadListOfTripsRequest, (state) => ({
    ...state,
    listOfTrips: {
      ...state.listOfTrips,
      isLoading: true,
      hasError: false,
    },
  })),

  on(AppActions.loadListOfTripsSuccess, (state, { items, itemsNumber }) => ({
    ...state,
    listOfTrips: {
      ...state.listOfTrips,
      items: items,
      itemsNumber: itemsNumber,
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
      isLoading: true,
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
