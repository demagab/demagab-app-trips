import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TripDef } from '@app/interfaces/trip-def.interface';
import { TripsDataService } from '@app/services/trips-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-of-trips',
  imports: [CommonModule],
  providers: [TripsDataService],
  templateUrl: './list-of-trips.component.html',
  styleUrl: './list-of-trips.component.scss'
})
export class ListOfTripsComponent {
  trips$: Observable<TripDef[]>;

  constructor(
    private tripsDataService: TripsDataService
  ) {
    this.trips$ = this.tripsDataService.getTrips$();
  }

}
