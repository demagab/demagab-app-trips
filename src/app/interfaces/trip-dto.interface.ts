export interface ListOfTripsDto {
    items: TripDto[];
    limit: number;
    page: number;
    total: number;
}
  
export interface TripDto {
    id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    nrOfRatings: number;
    verticalType: string;
    tags: string[];
    co2: number;
    thumbnailUrl: string;
    imageUrl: string;
    creationDate: string;
}
