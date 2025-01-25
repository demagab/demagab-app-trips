import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOfTripsComponent } from '@app/components/list-of-trips/list-of-trips.component';



describe('ListOfTripsComponent', () => {
  let component: ListOfTripsComponent;
  let fixture: ComponentFixture<ListOfTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfTripsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
