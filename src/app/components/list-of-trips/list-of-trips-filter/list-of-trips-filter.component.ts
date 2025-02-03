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

@Component({
  selector: 'app-list-of-trips-filter',
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
  ],
  templateUrl: './list-of-trips-filter.component.html',
  styleUrl: './list-of-trips-filter.component.scss',
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
      ]),
      maximumPrice: new FormControl(this.filter?.maximumPrice || null, [
        Validators.min(0),
      ]),
      minimumRating: new FormControl(this.filter?.minimumRating || null, [
        Validators.min(0),
        Validators.max(5),
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
}
