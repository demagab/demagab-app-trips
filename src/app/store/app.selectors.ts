import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@app/store/app.state';

export const selectAppState = createFeatureSelector<AppState>('feature');

export const selectListOfTripsItems = createSelector(
  selectAppState,
  (state) => state.listOfTrips.items,
);

export const selectListOfTripsItemsNumber = createSelector(
  selectAppState,
  (state) => state.listOfTrips.itemsNumber,
);

export const selectListOfTripsPagination = createSelector(
  selectAppState,
  (state) => state.listOfTrips.pagination,
);

export const selectListOfTripsIsLoading = createSelector(
  selectAppState,
  (state) => state.listOfTrips.isLoading,
);

export const selectListOfTripsHasError = createSelector(
  selectAppState,
  (state) => state.listOfTrips.hasError,
);

export const selectedTripItem = createSelector(
  selectAppState,
  (state) => state.selectedTrip.item,
);

export const selectedTripIsLoading = createSelector(
  selectAppState,
  (state) => state.selectedTrip.isLoading,
);

export const selectedTripHasError = createSelector(
  selectAppState,
  (state) => state.selectedTrip.hasError,
);

export const tripOfTheDayItem = createSelector(
  selectAppState,
  (state) => state.tripOfTheDay.item,
);

export const tripOfTheDayIsLoading = createSelector(
  selectAppState,
  (state) => state.tripOfTheDay.isLoading,
);

export const tripOfTheDayHasError = createSelector(
  selectAppState,
  (state) => state.tripOfTheDay.hasError,
);
