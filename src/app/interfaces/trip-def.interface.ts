export interface TripDef {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  numberOfRatings: number;
  verticalType: string;
  tags: string[];
  co2Emission: number;
  thumbnailUrl: string;
  imageUrl: string;
  creationDate: Date;
}
