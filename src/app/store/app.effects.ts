import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as AppActions from '@app/store/app.actions';
import { TripsDataService } from '@app/services/trips-data.service';

@Injectable()
export class AppEffects {
  loadListOfTrips$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.loadListOfTripsRequest),
        switchMap((action) =>
          this.tripsDataService.getTrips$().pipe(
            map((trips) => AppActions.loadListOfTripsSuccess({ items: trips })),
            catchError(() => of(AppActions.loadListOfTripsFailure())),
          ),
        ),
      ),
    { dispatch: true },
  );

  /*test$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.addItems),
      tap(it=> console.log('addItems effect', it))
    ), { dispatch: false }
  );*/

  constructor(
    private actions$: Actions,
    private tripsDataService: TripsDataService,
  ) {}
}
