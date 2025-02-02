import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import * as AppActions from '@app/store/app.actions';
import { AppFacade } from '@app/store/app.facade';
import { TripsDataService } from '@app/services/trips-data.service';
import { PersistanceService } from '@app/services/persistance.service';

@Injectable()
export class AppEffects {
  setListOfTripsPagination$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.setListOfTripsPagination),
        map((_) => AppActions.loadListOfTripsRequest()),
      ),
    { dispatch: true },
  );

  loadListOfTrips$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.loadListOfTripsRequest),
        withLatestFrom(this.appFacade.listOfTripsPagination$()),
        switchMap(([_, pagination]) =>
          this.tripsDataService.getTrips$(pagination).pipe(
            map((trips) => AppActions.loadListOfTripsSuccess({ items: trips })),
            catchError(() => of(AppActions.loadListOfTripsFailure())),
          ),
        ),
      ),
    { dispatch: true },
  );

  loadTripDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.loadTripDetailsRequest),
        switchMap((action) =>
          this.tripsDataService.getTripById$(action.itemId).pipe(
            map((trip) => AppActions.loadTripDetailsSuccess({ item: trip })),
            catchError(() => of(AppActions.loadTripDetailsFailure())),
          ),
        ),
      ),
    { dispatch: true },
  );

  loadTripOfTheDay$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.loadTripOfTheDayRequest),
        switchMap((_) => {
          const tripOfTheDayId = this.persistanceService.retrieveTripId();

          return (
            tripOfTheDayId
              ? this.tripsDataService.getTripById$(tripOfTheDayId)
              : this.tripsDataService.getTripOfTheDay$()
          ).pipe(
            map((trip) => AppActions.loadTripOfTheDaySuccess({ item: trip })),
            tap(
              (trip) =>
                !tripOfTheDayId &&
                this.persistanceService.persistTripId(trip.item.id),
            ),
            catchError(() => of(AppActions.loadTripOfTheDayFailure())),
          );
        }),
      ),
    { dispatch: true },
  );

  constructor(
    private actions$: Actions,
    private appFacade: AppFacade,
    private tripsDataService: TripsDataService,
    private persistanceService: PersistanceService,
  ) {}
}
