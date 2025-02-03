import { TripDef } from '@app/interfaces/trip-def.interface';
import {
  TripsFilterSortProperty,
  TripsPagination,
} from '@app/interfaces/trips-filter.interface';

export interface AppState {
  listOfTrips: {
    items: TripDef[];
    itemsNumber: number;
    pagination: TripsPagination;
    isLoading: boolean;
    hasError: boolean;
  };
  selectedTrip: {
    item?: TripDef;
    isLoading: boolean;
    hasError: boolean;
  };
  tripOfTheDay: {
    item?: TripDef;
    isLoading: boolean;
    hasError: boolean;
  };
}

export const initialState: AppState = {
  listOfTrips: {
    items: [],
    itemsNumber: 0,
    pagination: {
      pageNumber: 0,
      pageSize: 5,
      sortProperty: TripsFilterSortProperty.title,
      sortDescending: false,
    },
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
