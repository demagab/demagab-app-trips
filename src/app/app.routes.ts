import { Routes } from '@angular/router';
import { ListOfTripsComponent } from '@app/components/list-of-trips/list-of-trips.component';
import { TripDetailComponent } from '@app/components/trip-detail/trip-detail.component';
import { AppRoutes } from '@app/constants/app-routes.constant';

export const routes: Routes = [
  { path: '', redirectTo: `/${AppRoutes.TRIPS}`, pathMatch: 'full' },
  { path: AppRoutes.TRIPS, component: ListOfTripsComponent },
  { path: AppRoutes.TRIP, component: TripDetailComponent },
];
