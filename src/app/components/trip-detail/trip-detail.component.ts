import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-detail',
  imports: [CommonModule],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.scss'
})
export class TripDetailComponent implements OnInit {

  tripId: string = '';

  constructor (private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.tripId = this.activatedRoute.snapshot.paramMap.get('tripId') ?? '';
  }

}
