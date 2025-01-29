import { TripDef } from '@app/interfaces/trip-def.interface';
import { AppState } from '@app/store/app.state';

export const mockTrip1 = {id: 'id1'} as TripDef;
export const mockTrip2 = {id: 'id1'} as TripDef;

export const initialStateTest: AppState = {
    listOfTrips: {
      items: [
        mockTrip1
    ],
      isLoading: false,
      hasError: false,
    },
    selectedTrip: {
      item: {id: 'id2'} as TripDef,
      isLoading: false,
      hasError: false,
    }
  }