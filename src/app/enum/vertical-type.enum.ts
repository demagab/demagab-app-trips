export enum VerticalType {
  car = 'car',
  flight = 'flight',
  train = 'train',
  hotel = 'hotel',
}

export const VerticalTypeTranslationKeys: Record<VerticalType, string> = {
  [VerticalType.car]: 'content.vertical-type-values.car',
  [VerticalType.flight]: 'content.vertical-type-values.flight',
  [VerticalType.train]: 'content.vertical-type-values.train',
  [VerticalType.hotel]: 'content.vertical-type-values.hotel',
};
