import { Routes } from '@angular/router';
import { ListOfTripsComponent } from '@app/components/list-of-trips/list-of-trips.component';
import { TripDetailComponent } from '@app/components/trip-detail/trip-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'trips', component: ListOfTripsComponent },
  { path: 'trip/:tripId', component: TripDetailComponent },
];
