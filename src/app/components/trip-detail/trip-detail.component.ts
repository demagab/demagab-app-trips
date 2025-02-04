import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripDef } from '@app/interfaces/trip-def.interface';
import { AppFacade } from '@app/store/app.facade';
import { map, Observable } from 'rxjs';
import { TripComponent } from '@app/components/trip-detail/trip/trip.component';

@Component({
  selector: 'app-trip-detail',
  imports: [CommonModule, TripComponent],
  templateUrl: './trip-detail.component.html',
})
export class TripDetailComponent implements OnInit {
  trip$: Observable<TripDef | undefined>;
  tripIsLoading$: Observable<boolean>;
  tripHasError$: Observable<boolean>;

  tripId: string = '';

  constructor (
    private activatedRoute: ActivatedRoute,
    private appFacade: AppFacade,
  ) {
    this.trip$ = appFacade.selectedTrip$().pipe(map(it => this.filterOnlyMatchingRequestId(it)));
    this.tripIsLoading$ = appFacade.selectedTripLoading$();
    this.tripHasError$ = appFacade.selectedTripHasError$();
  }

  ngOnInit(): void {
    this.tripId = this.activatedRoute.snapshot.paramMap.get('tripId') ?? '';
    this.appFacade.fetchTripDetails(this.tripId);
  }

  private filterOnlyMatchingRequestId(trip: TripDef | undefined): TripDef | undefined {
    return trip?.id == this.tripId ? trip : undefined
  }

}
