import { TripDef } from '@app/interfaces/trip-def.interface';
import { TripsPagination } from '@app/interfaces/trips-filter.interface';

export interface AppState {
  listOfTrips: {
    items: TripDef[];
    pagination?: TripsPagination;
    isLoading: boolean;
    hasError: boolean;
  };
  selectedTrip: {
    item?: TripDef;
    isLoading: boolean;
    hasError: boolean;
  },
  tripOfTheDay: {
    item?: TripDef;
    isLoading: boolean;
    hasError: boolean;
  }
}

export const initialState: AppState = {
  listOfTrips: {
    items: [],
    pagination: undefined,
    isLoading: false,
    hasError: false,
  },
  selectedTrip: {
    item: undefined,
    isLoading: false,
    hasError: false,
  },
  tripOfTheDay: {
    item: undefined,
    isLoading: false,
    hasError: false,
  },
};
