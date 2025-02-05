export const AppRoutes = {
    TRIPS: 'trips',
    TRIP: 'trip/:tripId',
}

export function buildTripRoute(tripId: string): string {
    return `/${AppRoutes.TRIP.replace(':tripId',tripId)}`;
  }