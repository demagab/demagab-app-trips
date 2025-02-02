import { TripDef } from '@app/interfaces/trip-def.interface';
import { AppState } from '@app/store/app.state';

export const mockTrip1 = {id: 'id1', title: 'title1', description: 'description1' } as TripDef;
export const mockTrip2 = {id: 'id2', title: 'title2',description: 'description2' } as TripDef;

export const initialStateTest: AppState = {
    listOfTrips: {
      items: [
        mockTrip1
      ],
      pagination: {
        pageNumber: 15,
        pageSize: 3,
        filter: {
          title: mockTrip2.title
        }
      },
      isLoading: false,
      hasError: false,
    },
    selectedTrip: {
      item: mockTrip2,
      isLoading: false,
      hasError: false,
    }
  }