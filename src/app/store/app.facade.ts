import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '@app/store/app.state';
import { TripDef } from '@app/interfaces/trip-def.interface';
import * as AppActions from '@app/store/app.actions';
import * as AppSelectors from '@app/store/app.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  fetchListOfTrips(): void {
    this.store$.dispatch(AppActions.loadListOfTripsRequest());
  }

  listOfTrips$(): Observable<TripDef[]> {
    return this.store$.select(AppSelectors.selectListOfTripsItems);
  }

  listOfTripsIsLoading$(): Observable<boolean> {
    return this.store$.select(AppSelectors.selectListOfTripsIsLoading);
  }

  listOfTripsHasError$(): Observable<boolean> {
    return this.store$.select(AppSelectors.selectListOfTripsHasError);
  }

  constructor(private store$: Store<AppState>) {}
}
