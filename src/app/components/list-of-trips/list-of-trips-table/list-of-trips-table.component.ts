import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Rating } from 'primeng/rating';
import { Tag } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VerticalType, VerticalTypeTranslationKeys } from '@app/enum/vertical-type.enum';
import { TripDef } from '@app/interfaces/trip-def.interface';
import {
  TripsFilterSortProperty,
  TripsPagination,
} from '@app/interfaces/trips-filter.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Co2Pipe } from '@app/pipes/co2.pipe';
import { TripsScoreService } from '@app/services/trips-score.service';
import { buildTripRoute } from '@app/constants/app-routes.constant';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    ToastModule,
    TranslateModule,
    Co2Pipe,
  ],
  providers: [MessageService],
  templateUrl: './list-of-trips-table.component.html',
})
export class ListOfTripsTableComponent implements OnChanges {
  @Input() listOfTrips!: TripDef[];
  @Input() pagination!: TripsPagination;
  @Input() loading!: boolean;
  @Input() hasError!: boolean;
  @Input() listOfTripsNumber!: number;

  @Output() paginationChange: EventEmitter<TripsPagination> =
    new EventEmitter<TripsPagination>();

  get tableFirst(): number {
    return (this.pagination.pageNumber -1) * this.pagination.pageSize;
  }

  constructor(private messageService: MessageService, private translateService: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hasError']?.currentValue === true) {
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('content.error'),
        detail: this.translateService.instant('error.an-error-has-occurred-while-loading-trips'),
        life: 5000,
      });
    }
  }

  lazyLoad(event: TableLazyLoadEvent) {
    const pageSize = event.rows || this.pagination.pageSize;
    const pageNumber = Math.floor((event.first || 0) / pageSize) + 1;
    const sortProperty = event.sortField || TripsFilterSortProperty.title;

    this.paginationChange.emit({
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortProperty: sortProperty as TripsFilterSortProperty,
      sortDescending: event.sortOrder !== 1,
    });
  }

  getTripRoute = buildTripRoute;
  getSeverity = TripsScoreService.getSeverity;
  getScoreTranslationKey = TripsScoreService.getScoreTranslationKey;
  verticalTypeTranslationKey = (verticalType: VerticalType) => VerticalTypeTranslationKeys[verticalType];

  readonly sortableColumns = TripsFilterSortProperty;
}
