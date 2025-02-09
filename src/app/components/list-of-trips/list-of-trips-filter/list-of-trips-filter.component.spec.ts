import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTripsFilterComponent } from './list-of-trips-filter.component';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('ListOfTripsFilterComponent', () => {
  let component: ListOfTripsFilterComponent;
  let fixture: ComponentFixture<ListOfTripsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfTripsFilterComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfTripsFilterComponent);
    component = fixture.componentInstance;

    component.filterForm = new FormGroup({
      title: new FormControl(),
      minimumPrice: new FormControl(),
      maximumPrice: new FormControl(),
      minimumRating: new FormControl(),
      tags: new FormControl(),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
