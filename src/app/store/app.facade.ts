import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '@app/store/app.state';
import { TripDef } from '@app/interfaces/trip-def.interface';
import * as AppActions from '@app/store/app.actions';
import * as AppSelectors from '@app/store/app.selectors';
import { TripsPagination } from '@app/interfaces/trips-filter.interface';

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  setListOfTripsPagination(pagination?: TripsPagination): void {
    this.store$.dispatch(AppActions.setListOfTripsPagination({ pagination }));
  }

  fetchListOfTrips(): void {
    this.store$.dispatch(AppActions.loadListOfTripsRequest());
  }

  listOfTrips$(): Observable<TripDef[]> {
    return this.store$.select(AppSelectors.selectListOfTripsItems);
  }

  listOfTripsPagination$(): Observable<TripsPagination | undefined> {
    return this.store$.select(AppSelectors.selectListOfTripsPagination);
  }

  listOfTripsIsLoading$(): Observable<boolean> {
    return this.store$.select(AppSelectors.selectListOfTripsIsLoading);
  }

  listOfTripsHasError$(): Observable<boolean> {
    return this.store$.select(AppSelectors.selectListOfTripsHasError);
  }

  fetchTripDetails(tripId: string): void {
    this.store$.dispatch(AppActions.loadTripDetailsRequest({ itemId: tripId }));
  }

  selectedTrip$(): Observable<TripDef | undefined> {
    return this.store$.select(AppSelectors.selectedTripItem);
  }

  selectedTripLoading$(): Observable<boolean> {
    return this.store$.select(AppSelectors.selectedTripIsLoading);
  }

  selectedTripHasError$(): Observable<boolean> {
    return this.store$.select(AppSelectors.selectedTripHasError);
  }

  fetchTripOfTheDay(): void {
    this.store$.dispatch(AppActions.loadTripOfTheDayRequest());
  }

  tripOfTheDayItem$(): Observable<TripDef | undefined> {
    return this.store$.select(AppSelectors.tripOfTheDayItem);
  }

  tripOfTheDayIsLoading$(): Observable<boolean> {
    return this.store$.select(AppSelectors.tripOfTheDayIsLoading);
  }

  tripOfTheDayHasErrorError$(): Observable<boolean> {
    return this.store$.select(AppSelectors.tripOfTheDayHasError);
  }

  constructor(private store$: Store<AppState>) {}
}
