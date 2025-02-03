import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TripDef } from '@app/interfaces/trip-def.interface';
import { AppFacade } from '@app/store/app.facade';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TripsFilter, TripsPagination } from '@app/interfaces/trips-filter.interface';
import { ListOfTripsTableComponent } from '@app/components/list-of-trips/list-of-trips-table/list-of-trips-table.component';
import { initialState } from '@app/store/app.state';
import { ListOfTripsFilterComponent } from "./list-of-trips-filter/list-of-trips-filter.component";

@Component({
  selector: 'app-list-of-trips',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ButtonModule,
    TableModule,
    ListOfTripsTableComponent,
    ListOfTripsFilterComponent
],
  providers: [],
  templateUrl: './list-of-trips.component.html',
  styleUrl: './list-of-trips.component.scss',
})
export class ListOfTripsComponent {
  readonly defaultTripsPagination = initialState.listOfTrips.pagination;

  listOfTrips$: Observable<TripDef[]>;
  tripsPagination$: Observable<TripsPagination | undefined>;
  listOfTripsNumber$: Observable<number>;
  listOfTripsIsLoading$: Observable<boolean>;
  listOfTripsHasError$: Observable<boolean>;

  tripOfTheDay$: Observable<TripDef | undefined>;
  tripOfTheDayIsLoading$: Observable<boolean>;
  tripOfTheDayHasError$: Observable<boolean>;

  constructor(private appFacade: AppFacade) {
    this.listOfTrips$ = this.appFacade.listOfTrips$();
    this.tripsPagination$ = this.appFacade.listOfTripsPagination$();
    this.listOfTripsNumber$ = this.appFacade.listOfTripsNumber$();
    this.listOfTripsIsLoading$ = this.appFacade.listOfTripsIsLoading$();
    this.listOfTripsHasError$ = this.appFacade.listOfTripsHasError$();

    this.tripOfTheDay$ = this.appFacade.tripOfTheDayItem$();
    this.tripOfTheDayIsLoading$ = this.appFacade.tripOfTheDayIsLoading$();
    this.tripOfTheDayHasError$ = this.appFacade.tripOfTheDayHasErrorError$();
  }

  getTripOfTheDay(): void {
    this.appFacade.fetchTripOfTheDay();
  }

  onFilterChange(filter: TripsFilter | null): void {
    if (filter === null) {
      this.appFacade.setListOfTripsPagination({ filter: {} }, true);
    } else {
      const filteredFilter = Object.keys(filter)
      .filter(key => filter[key as keyof TripsFilter] != null && filter[key as keyof TripsFilter] !== '')
      .reduce((acc, key) => ({ ...acc, [key]: filter[key as keyof TripsFilter] }), {});

      this.appFacade.setListOfTripsPagination({ filter: filteredFilter }, false);
    }
  }

  onPaginationChange(pagination: TripsPagination): void {
    this.appFacade.setListOfTripsPagination(pagination, false);
  }
}
