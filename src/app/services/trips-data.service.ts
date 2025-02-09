import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiEndpointUrls } from '@app/constants/api-endpoint-urls.constant';
import { ListOfTripsDef, TripDef } from '@app/interfaces/trip-def.interface';
import { ListOfTripsDto, TripDto } from '@app/interfaces/trip-dto.interface';
import { TripsMapperService } from '@app/services/trips-mapper.service';
import { environment } from '@environments/environment';
import { TripsPagination } from '@app/interfaces/trips-filter.interface';

@Injectable({
  providedIn: 'root',
})
export class TripsDataService {
  constructor(private httpClient: HttpClient) {}

  getTrips$(pagination?: TripsPagination): Observable<ListOfTripsDef> {
    return this.httpClient
      .get<ListOfTripsDto>(environment.apiUrl + ApiEndpointUrls.TRIPS, {
        params: pagination && TripsMapperService.mapTripsPagination(pagination),
      })
      .pipe(
        map((listOfTrips) => TripsMapperService.mapListOfTripsDto(listOfTrips)),
      );
  }

  getTripById$(tripId: string): Observable<TripDef> {
    return this.httpClient
      .get<TripDto>(
        environment.apiUrl + ApiEndpointUrls.TRIP.replace('{id}', tripId),
      )
      .pipe(map((trip) => TripsMapperService.mapTripDto(trip)));
  }

  getTripOfTheDay$(): Observable<TripDef> {
    return this.httpClient
      .get<TripDto>(environment.apiUrl + ApiEndpointUrls.TRIP_OF_THE_DAY)
      .pipe(map((trip) => TripsMapperService.mapTripDto(trip)));
  }
}
