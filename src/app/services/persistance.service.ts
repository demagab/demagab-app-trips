import { Injectable } from '@angular/core';
import { PersistedItem } from '@app/interfaces/persistance.inferface';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  private readonly persistedIdKey = 'persisted_item';

  persistTripId(tripId: string): void {
    const now = new Date();
    const expirationTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    const item: PersistedItem = {
      value: tripId,
      expiration: expirationTime,
    };

    localStorage.setItem(this.persistedIdKey, JSON.stringify(item));
  }

  retrieveTripId(): string | null {
    const persistedValue = localStorage.getItem(this.persistedIdKey);

    const item: PersistedItem = persistedValue && JSON.parse(persistedValue);

    return item && new Date(item.expiration) > new Date() ? item.value : null;
  }
}
