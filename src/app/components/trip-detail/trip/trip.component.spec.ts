import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripComponent } from './trip.component';
import { TranslateModule } from '@ngx-translate/core';

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
