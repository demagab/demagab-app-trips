import { TripDef } from '@app/interfaces/trip-def.interface';

export interface AppState {
  listOfTrips: {
    items: TripDef[];
    isLoading: boolean;
    hasError: boolean;
  };
}

export const initialState: AppState = {
  listOfTrips: {
    items: [],
    isLoading: false,
    hasError: false,
  },
};
