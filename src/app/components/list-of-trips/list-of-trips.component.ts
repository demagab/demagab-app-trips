import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TripDef } from '@app/interfaces/trip-def.interface';
import { AppFacade } from '@app/store/app.facade';

@Component({
  selector: 'app-list-of-trips',
  imports: [CommonModule],
  providers: [],
  templateUrl: './list-of-trips.component.html',
  styleUrl: './list-of-trips.component.scss',
})
export class ListOfTripsComponent implements OnInit {
  listOfTrips$: Observable<TripDef[]>;
  listOfTripsIsLoading$: Observable<boolean>;
  listOfTripsHasError$: Observable<boolean>;

  constructor(private appFacade: AppFacade) {
    this.listOfTrips$ = this.appFacade.listOfTrips$();
    this.listOfTripsIsLoading$ = this.appFacade.listOfTripsIsLoading$();
    this.listOfTripsHasError$ = this.appFacade.listOfTripsHasError$();
  }

  ngOnInit(): void {
    this.appFacade.fetchListOfTrips();
  }
}
