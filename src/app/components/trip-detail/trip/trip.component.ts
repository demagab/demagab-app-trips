import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { Co2Pipe } from "../../../pipes/co2.pipe";
import { TripDef } from '@app/interfaces/trip-def.interface';
import { Tag } from 'primeng/tag';
import { ProgressSpinner } from 'primeng/progressspinner';
import { TripsScoreService } from '@app/services/trips-score.service';

@Component({
  selector: 'app-trip',
  imports: [
    CommonModule,
    Rating,
    FormsModule,
    ProgressSpinner,
    Tag,
    Co2Pipe
],
  templateUrl: './trip.component.html',
})
export class TripComponent {
  @Input() trip!: TripDef | null;
  @Input() loading!: boolean;
  @Input() hasError!: boolean;

  getFormattedTags(tags: string[]): string {
    return tags?.map(it=> `#${it}`).join(' ') ?? '-'
  }

  getSeverity = TripsScoreService.getSeverity;
  getScoreTranslationKey = TripsScoreService.getScoreTranslationKey;

}
