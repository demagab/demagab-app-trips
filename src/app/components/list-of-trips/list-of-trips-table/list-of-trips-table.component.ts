import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Rating } from 'primeng/rating';
import { Tag } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripDef } from '@app/interfaces/trip-def.interface';
import {
  TripsFilterSortProperty,
  TripsPagination,
} from '@app/interfaces/trips-filter.interface';

@Component({
  selector: 'app-list-of-trips-table',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ButtonModule,
    TableModule,
    Rating,
    Tag,
  ],
  templateUrl: './list-of-trips-table.component.html',
  styleUrl: './list-of-trips-table.component.scss',
})
export class ListOfTripsTableComponent {
  @Input() listOfTrips!: TripDef[];
  @Input() pagination!: TripsPagination;
  @Input() loading!: boolean;
  @Input() listOfTripsNumber!: number;

  @Output() paginationChange: EventEmitter<TripsPagination> =
    new EventEmitter<TripsPagination>();

  lazyLoad(event: TableLazyLoadEvent) {
    const pageSize = event.rows || 10;
    const pageNumber = Math.floor((event.first || 0) / pageSize + 1);
    const sortProperty = event.sortField || TripsFilterSortProperty.title;

    this.paginationChange.emit({
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortProperty: sortProperty as TripsFilterSortProperty,
      sortDescending: event.sortOrder !== 1,
    });
  }

  getSeverity(rating: number) {
    return rating > 1 ? 'success' : rating > 0 ? 'warn' : 'danger';
  }

  getScoreTranslationKey(rating: number) {
    return rating > 1 ? 'awesome' : rating > 0 ? 'good' : 'average';
  }
}
