export interface TripsPagination {
    pageNumber: number;
    pageSize: number;
    sortProperty: TripsFilterSortProperty;
    sortDescending: boolean;
    filter?: TripsFilter;
  }
  
  export interface TripsFilter {
    title?: string;
    minimumPrice?: number;
    maximumPrice?: number;
    minimumRating?: number;
    tags?: string[];
  }
  
  export enum TripsFilterSortProperty {
    title = 'title',
    price = 'price',
    rating = 'rating',
    creationDate = 'creationDate',
    verticalType = 'verticalType'
  }
  