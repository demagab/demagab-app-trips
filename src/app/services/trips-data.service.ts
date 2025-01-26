import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiEndpointUrls } from '@app/constants/api-endpoint-urls.constant';
import { TripDef } from '@app/interfaces/trip-def.interface';
import { ListOfTripsDto } from '@app/interfaces/trip-dto.interface';
import { TripsMapperService } from '@app/services/trips-mapper.service';
import { environment } from '@environments/production.environments';

@Injectable({
  providedIn: 'root',
})
export class TripsDataService {
  constructor(private httpClient: HttpClient) {}

  getTrips$(): Observable<TripDef[]> {
    return this.httpClient
      .get<ListOfTripsDto>(environment.apiUrl + ApiEndpointUrls.TRIPS)
      .pipe(
        map((listOfTrips) => TripsMapperService.mapListOfTripsDto(listOfTrips)),
      );
  }
}
