import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@app/store/app.state';

export const selectAppState = createFeatureSelector<AppState>('feature');

export const selectListOfTripsItems = createSelector(
  selectAppState,
  (state) => state.listOfTrips.items,
);

export const selectListOfTripsIsLoading = createSelector(
  selectAppState,
  (state) => state.listOfTrips.isLoading,
);

export const selectListOfTripsHasError = createSelector(
  selectAppState,
  (state) => state.listOfTrips.hasError,
);
