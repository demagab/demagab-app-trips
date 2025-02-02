import { HttpParams } from '@angular/common/http';
import { TripDef } from '@app/interfaces/trip-def.interface';
import { ListOfTripsDto, TripDto } from '@app/interfaces/trip-dto.interface';
import {
  TripsFilterSortProperty,
  TripsPagination,
} from '@app/interfaces/trips-filter.interface';

export class TripsMapperService {
  static mapListOfTripsDto(dto: ListOfTripsDto): TripDef[] {
    return dto.items?.map((trip) => TripsMapperService.mapTripDto(trip)) ?? [];
  }

  static mapTripDto(dto: TripDto): TripDef {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      price: dto.price,
      rating: dto.rating,
      numberOfRatings: dto.nrOfRatings,
      verticalType: dto.verticalType,
      tags: dto.tags.map((tag) => tag),
      co2Emission: dto.co2,
      thumbnailUrl: dto.thumbnailUrl,
      imageUrl: dto.imageUrl,
      creationDate: new Date(dto.creationDate),
    };
  }

  static mapTripsPagination(pagination: TripsPagination): HttpParams {
    let httpParams = new HttpParams();

    httpParams = httpParams.set('page', pagination.pageNumber);
    httpParams = httpParams.set('limit', pagination.pageSize);

    if (pagination.sortProperty !== undefined) {
      httpParams = httpParams.set(
        'sortBy',
        TripsMapperService.mapTripsFilterSortProperty(pagination.sortProperty),
      );
    }
    if (pagination.sortDescending !== undefined) {
      httpParams = httpParams.set(
        'sortOrder',
        pagination.sortDescending ? 'DESC' : 'ASC',
      );
    }

    if (pagination.filter) {
      const filter = pagination.filter;

      if (filter.title) {
        httpParams = httpParams.set('titleFilter', filter.title);
      }
      if (filter.minimumPrice !== undefined) {
        httpParams = httpParams.set('minPrice', filter.minimumPrice);
      }
      if (filter.maximumPrice !== undefined) {
        httpParams = httpParams.set('maxPrice', filter.maximumPrice);
      }
      if (filter.minimumRating !== undefined) {
        httpParams = httpParams.set('minRating', filter.minimumRating);
      }
      if (filter.tags && filter.tags.length > 0) {
        httpParams = httpParams.set(
          'tags',
          filter.tags.map((tag) => encodeURIComponent(tag)).join(','),
        );
      }
    }

    return httpParams;
  }

  private static mapTripsFilterSortProperty(
    property: TripsFilterSortProperty,
  ): string {
    switch (property) {
      case TripsFilterSortProperty.creationDate:
        return 'creationDate';
      case TripsFilterSortProperty.price:
        return 'price';
      case TripsFilterSortProperty.rating:
        return 'rating';
      case TripsFilterSortProperty.title:
        return 'title';
    }
  }
}
