import { PersistedItem } from '@app/interfaces/persistance.inferface';

import { PersistanceService } from '@app/services/persistance.service';

describe(`PersistanceService`, () => {
  const persistedIdKey = 'persisted_item';
  let service: PersistanceService;

  beforeEach(() => {
    service = new PersistanceService();
    localStorage.clear();
  });

  describe(`persistTripId`, () => {
    it(`should store tripId with correct expiration date in localStorage`, () => {
      const tripId = 'tripId';
      const spyOnLocalStorage = spyOn(localStorage, 'setItem');

      service.persistTripId(tripId);

      const now = new Date();
      const expectedItem: PersistedItem = {
        value: tripId,
        expiration: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23,
          59,
          59,
          999,
        ),
      };

      expect(spyOnLocalStorage).toHaveBeenCalledWith(
        persistedIdKey,
        JSON.stringify(expectedItem),
      );
    });
  });

  describe(`retrieveTripId`, () => {
    it(`should return tripId if present and not expired`, () => {
      const tripId = 'tripId';
      const now = new Date();
      const mockItem: PersistedItem = {
        value: tripId,
        expiration: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23,
          59,
          59,
          999,
        ),
      };

      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockItem));
      const retrievedTripId = service.retrieveTripId();

      expect(retrievedTripId).toBe(tripId);
    });

    it(`should not return tripId if expired`, () => {
      const tripId = 'tripId';
      const now = new Date();
      const mockItem: PersistedItem = {
        value: tripId,
        expiration: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1,
          23,
          59,
          59,
          999,
        ),
      };

      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockItem));
      const retrievedTripId = service.retrieveTripId();

      expect(retrievedTripId).toBe(null);
    });

    it(`should not return tripId if not set`, () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      const retrievedTripId = service.retrieveTripId();

      expect(retrievedTripId).toBe(null);
    });
  });
});
