import { HttpParams } from '@angular/common/http';
import {
  TripsPagination,
  TripsFilterSortProperty,
} from '@app/interfaces/trips-filter.interface';
import { TripsMapperService } from '@app/services/trips-mapper.service';

describe(`MapperService`, () => {
  describe(`mapTripsPagination`, () => {
    it(`should correctly map pagination parameters`, () => {
      const pagination: TripsPagination = {
        pageNumber: 2,
        pageSize: 20,
        sortProperty: TripsFilterSortProperty.price,
        sortDescending: true,
      };

      const params: HttpParams =
        TripsMapperService.mapTripsPagination(pagination);

      expect(params.get('page')).toBe('2');
      expect(params.get('limit')).toBe('20');
      expect(params.get('sortBy')).toBe('price');
      expect(params.get('sortOrder')).toBe('DESC');
    });

    it(`should correctly map filter parameters`, () => {
      const pagination: TripsPagination = {
        pageNumber: 1,
        pageSize: 10,
        filter: {
          title: 'filterTitle',
          minimumPrice: 100,
          maximumPrice: 500,
          minimumRating: 4,
        },
      };

      const params: HttpParams =
        TripsMapperService.mapTripsPagination(pagination);

      expect(params.get('titleFilter')).toBe('filterTitle');
      expect(params.get('minPrice')).toBe('100');
      expect(params.get('maxPrice')).toBe('500');
      expect(params.get('minRating')).toBe('4');
    });

    it(`should correctly encode tags`, () => {
      const pagination: TripsPagination = {
        pageNumber: 1,
        pageSize: 10,
        filter: {
          tags: ['tag1 & test', 'tag2/test'],
        },
      };

      const params: HttpParams =
        TripsMapperService.mapTripsPagination(pagination);

      expect(params.get('tags')).toBe(
        encodeURIComponent('tag1 & test') +
          ',' +
          encodeURIComponent('tag2/test'),
      );
    });

    it(`should not include undefined values`, () => {
      const pagination: TripsPagination = {
        pageNumber: 1,
        pageSize: 10,
        sortProperty: undefined,
        sortDescending: undefined,
        filter: {
          title: undefined,
          minimumPrice: undefined,
          maximumPrice: undefined,
          minimumRating: undefined,
          tags: undefined,
        },
      };

      const params: HttpParams =
        TripsMapperService.mapTripsPagination(pagination);

      expect(params.has('sortBy')).toBeFalse();
      expect(params.has('sortOrder')).toBeFalse();
      expect(params.has('titleFilter')).toBeFalse();
      expect(params.has('minPrice')).toBeFalse();
      expect(params.has('maxPrice')).toBeFalse();
      expect(params.has('minRating')).toBeFalse();
      expect(params.has('tags')).toBeFalse();
    });
  });
});
