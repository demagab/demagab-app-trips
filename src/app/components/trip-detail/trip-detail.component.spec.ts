import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripDetailComponent } from './trip-detail.component';
import { TripDef } from '@app/interfaces/trip-def.interface';
import { mockTrip1 } from '@app/store/tests/app-state-test';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

const tripMock: TripDef = { id: 'tripId_1', title: 'tripTitle' } as TripDef;

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: () => tripMock.id,
    },
  },
};

describe('TripDetailComponent', () => {
  let component: TripDetailComponent;
  let fixture: ComponentFixture<TripDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'trip' } },
            params: of({ id: 'tripId' }),
          },
        },
        {
          provide: Store,
          useValue: {
            select: () => of({}),
            dispatch: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TripDetailComponent);
    component = fixture.componentInstance;
  });

  describe(`filterOnlyMatchingRequestId`, () => {
    it(`should return the trip if the tripId matches`, () => {
      component.tripId = tripMock.id;
      const result = component['filterOnlyMatchingRequestId'](tripMock);

      expect(result).toEqual(tripMock);
    });

    it(`should return undefined if the tripId does not match`, () => {
      component.tripId = 'unknonw_id';
      const result = component['filterOnlyMatchingRequestId'](tripMock);

      expect(result).toBeUndefined();
    });

    it(`should return undefined if trip is undefined`, () => {
      component.tripId = mockTrip1.id;
      const result = component['filterOnlyMatchingRequestId'](undefined);

      expect(result).toBeUndefined();
    });
  });
});
