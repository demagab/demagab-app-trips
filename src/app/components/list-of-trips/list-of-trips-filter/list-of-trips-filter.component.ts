import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { TripsFilter } from '@app/interfaces/trips-filter.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list-of-trips-filter',
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    TranslateModule,
  ],
  templateUrl: './list-of-trips-filter.component.html',
})
export class ListOfTripsFilterComponent implements OnChanges {
  @Input() filter!: TripsFilter;
  @Output() filterChange: EventEmitter<TripsFilter | null> =
    new EventEmitter<TripsFilter | null>();

  filterForm!: FormGroup;

  ngOnChanges(): void {
    this.filterForm = new FormGroup({
      title: new FormControl(this.filter?.title || ''),
      minimumPrice: new FormControl(this.filter?.minimumPrice || null, [
        Validators.min(0),
        Validators.pattern(this.numberPattern),
      ]),
      maximumPrice: new FormControl(this.filter?.maximumPrice || null, [
        Validators.min(0),
        Validators.pattern(this.numberPattern),
      ]),
      minimumRating: new FormControl(this.filter?.minimumRating || null, [
        Validators.min(0),
        Validators.max(5),
        Validators.pattern(this.numberPattern),
      ]),
      tags: new FormControl(this.filter?.tags || []),
    });
  }

  submit(): void {
    this.filterForm.valid &&
      this.filterChange.emit({
        ...this.filterForm.value,
        tags: this.filterForm.value.tags
          ? [this.filterForm.value.tags.toString().split(/[\s.,;-]+/)]
          : null,
      });
  }

  reset(): void {
    this.filterChange.emit(null);
  }

  private readonly numberPattern = '^[0-9.]+$';
}
