import { Routes } from '@angular/router';
import { ListOfTripsComponent } from '@app/components/list-of-trips/list-of-trips.component';

export const routes: Routes = [
    {path: '', redirectTo: '/trips', pathMatch: 'full'},
    {path: 'trips', component: ListOfTripsComponent}
];
