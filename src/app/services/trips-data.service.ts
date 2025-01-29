import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

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
    return of(JSON.parse(`[
    {
        "id": "57be77a0-a37f-44f9-902d-445d78d781ee",
        "title": "Trip to Budapest",
        "description": "A beautiful journey through the city of lights",
        "price": 4096.2,
        "rating": 4.1,
        "numberOfRatings": 363,
        "verticalType": "train",
        "tags": [
            "food",
            "history",
            "culture"
        ],
        "co2Emission": 297.8,
        "thumbnailUrl": "https://picsum.photos/id/511/200/200",
        "imageUrl": "https://picsum.photos/id/511/600/800",
        "creationDate": "2024-10-20T19:40:20.747Z"
    },
    {
        "id": "3fd26f38-f077-4eb2-935d-aec6b650dfe9",
        "title": "Trip to Seoul",
        "description": "A beautiful journey through the city of lights",
        "price": 1050.57,
        "rating": 3,
        "numberOfRatings": 212,
        "verticalType": "train",
        "tags": [
            "business",
            "shopping",
            "culture"
        ],
        "co2Emission": 156.8,
        "thumbnailUrl": "https://picsum.photos/id/339/200/200",
        "imageUrl": "https://picsum.photos/id/339/600/800",
        "creationDate": "2024-10-20T19:40:20.761Z"
    },
    {
        "id": "ad34a7c8-a483-4376-80a6-e02c85a6a0d9",
        "title": "Trip to Sydney",
        "description": "A beautiful journey through the eternal city",
        "price": 2581.19,
        "rating": 1.7,
        "numberOfRatings": 242,
        "verticalType": "flight",
        "tags": [
            "history",
            "business",
            "culture"
        ],
        "co2Emission": 600.3,
        "thumbnailUrl": "https://picsum.photos/id/120/200/200",
        "imageUrl": "https://picsum.photos/id/120/600/800",
        "creationDate": "2024-10-20T19:40:20.766Z"
    },
    {
        "id": "45151481-434b-47c9-b96f-6b4cc74c05fb",
        "title": "Trip to Hanoi",
        "description": "A beautiful journey through the eternal city",
        "price": 4403.24,
        "rating": 4,
        "numberOfRatings": 976,
        "verticalType": "hotel",
        "tags": [
            "shopping",
            "nature"
        ],
        "co2Emission": 207.7,
        "thumbnailUrl": "https://picsum.photos/id/404/200/200",
        "imageUrl": "https://picsum.photos/id/404/600/800",
        "creationDate": "2024-10-20T19:40:20.771Z"
    },
    {
        "id": "9e0b3ef4-cd99-44ac-8912-bd772b379d25",
        "title": "Trip to Singapore",
        "description": "A beautiful journey through the city of lights",
        "price": 3757.72,
        "rating": 3.8,
        "numberOfRatings": 159,
        "verticalType": "car",
        "tags": [
            "culture",
            "food",
            "history"
        ],
        "co2Emission": 656.4,
        "thumbnailUrl": "https://picsum.photos/id/456/200/200",
        "imageUrl": "https://picsum.photos/id/456/600/800",
        "creationDate": "2024-10-20T19:40:20.776Z"
    },
    {
        "id": "d12fd2ee-7077-48eb-a98b-036c605c186b",
        "title": "Trip to Edinburgh",
        "description": "A beautiful journey through the eternal city",
        "price": 1531.13,
        "rating": 3.1,
        "numberOfRatings": 921,
        "verticalType": "train",
        "tags": [
            "culture",
            "shopping",
            "business"
        ],
        "co2Emission": 760.6,
        "thumbnailUrl": "https://picsum.photos/id/559/200/200",
        "imageUrl": "https://picsum.photos/id/559/600/800",
        "creationDate": "2024-10-20T19:40:20.781Z"
    },
    {
        "id": "48c019d7-afda-4dcd-8359-499cd5befb6f",
        "title": "Trip to Oslo",
        "description": "A beautiful journey through the big apple",
        "price": 2517.32,
        "rating": 3.1,
        "numberOfRatings": 566,
        "verticalType": "car",
        "tags": [
            "history",
            "business",
            "nature"
        ],
        "co2Emission": 208.7,
        "thumbnailUrl": "https://picsum.photos/id/272/200/200",
        "imageUrl": "https://picsum.photos/id/272/600/800",
        "creationDate": "2024-10-20T19:40:20.786Z"
    },
    {
        "id": "5062a516-44b7-4b4b-a3b1-9ec0d33cb685",
        "title": "Trip to London",
        "description": "A beautiful journey through the city of lights",
        "price": 4069.02,
        "rating": 4.6,
        "numberOfRatings": 209,
        "verticalType": "train",
        "tags": [
            "history",
            "food"
        ],
        "co2Emission": 834.7,
        "thumbnailUrl": "https://picsum.photos/id/544/200/200",
        "imageUrl": "https://picsum.photos/id/544/600/800",
        "creationDate": "2024-10-20T19:40:20.792Z"
    },
    {
        "id": "c70640be-5578-43ba-ad35-acd481841764",
        "title": "Trip to Hanoi",
        "description": "A beautiful journey through the eternal city",
        "price": 2783.29,
        "rating": 2.5,
        "numberOfRatings": 897,
        "verticalType": "car",
        "tags": [
            "shopping"
        ],
        "co2Emission": 933.5,
        "thumbnailUrl": "https://picsum.photos/id/282/200/200",
        "imageUrl": "https://picsum.photos/id/282/600/800",
        "creationDate": "2024-10-20T19:40:20.799Z"
    },
    {
        "id": "d6fbf01e-5059-4ba2-b6c6-bc4baa3c4889",
        "title": "Trip to Madrid",
        "description": "A beautiful journey through the city of lights",
        "price": 1643.78,
        "rating": 1.8,
        "numberOfRatings": 879,
        "verticalType": "flight",
        "tags": [
            "nature"
        ],
        "co2Emission": 83.3,
        "thumbnailUrl": "https://picsum.photos/id/701/200/200",
        "imageUrl": "https://picsum.photos/id/701/600/800",
        "creationDate": "2024-10-20T19:40:20.806Z"
    }
]`));
    return this.httpClient
      .get<ListOfTripsDto>(environment.apiUrl + ApiEndpointUrls.TRIPS)
      .pipe(
        map((listOfTrips) => TripsMapperService.mapListOfTripsDto(listOfTrips)),
      );
  }
}
