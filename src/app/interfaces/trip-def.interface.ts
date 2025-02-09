import { VerticalType } from '@app/enum/vertical-type.enum';

export interface ListOfTripsDef {
  items: TripDef[];
  limit: number;
  page: number;
  total: number;
}

export interface TripDef {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  numberOfRatings: number;
  verticalType: VerticalType;
  tags: string[];
  co2Emission: number;
  thumbnailUrl: string;
  imageUrl: string;
  creationDate: Date;
  score?: number;
}
