import { TripDef } from '@app/interfaces/trip-def.interface';
import { ListOfTripsDto, TripDto } from '@app/interfaces/trip-dto.interface';

export class TripsMapperService {
  static mapListOfTripsDto(dto: ListOfTripsDto): TripDef[] {
    return dto.items?.map(trip => TripsMapperService.mapTripDto(trip)) ?? [];
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
}
