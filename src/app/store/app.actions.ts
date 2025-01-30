import { createAction, props } from '@ngrx/store';

import { TripDef } from '@app/interfaces/trip-def.interface';

export const loadListOfTripsRequest = createAction(
  '[App] Load list of trips - Request',
);

export const loadListOfTripsSuccess = createAction(
  '[App] Load list of trips - Success',
  props<{ items: TripDef[] }>(),
);

export const loadListOfTripsFailure = createAction(
  '[App] Load list of trips - Failure',
);

export const loadTripDetailsRequest = createAction(
  '[App] Load trip details - Request',
  props<{ itemId: string }>(),
);

export const loadTripDetailsSuccess = createAction(
  '[App] Load trip details - Success',
  props<{ item: TripDef }>(),
);

export const loadTripDetailsFailure = createAction(
  '[App] Load trip details - Failure',
);