import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOfferComponent } from './place-offer.component';

describe('PlaceOfferComponent', () => {
  let component: PlaceOfferComponent;
  let fixture: ComponentFixture<PlaceOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
