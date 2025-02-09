import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TripDef } from '@app/interfaces/trip-def.interface';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Rating } from 'primeng/rating';
import { Co2Pipe } from '@app/pipes/co2.pipe';
import { buildTripRoute } from '@app/constants/app-routes.constant';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-trip-of-the-day',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    Rating,
    RouterLink,
    Co2Pipe,
    TranslateModule,
],
  templateUrl: './trip-of-the-day.component.html',
  styleUrl: './trip-of-the-day.component.scss'
})
export class TripOfTheDayComponent {
  @Input() trip!: TripDef | null;
  @Input() loading!: boolean;
  @Input() hasError!: boolean;

  @Output() requestTrip: EventEmitter<void> = new EventEmitter();

  getTripOfTheDay():void {
    this.requestTrip.emit()
  }

  getTripRoute = buildTripRoute;
}
