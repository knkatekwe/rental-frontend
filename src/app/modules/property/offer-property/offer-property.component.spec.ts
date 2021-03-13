import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPropertyComponent } from './offer-property.component';

describe('OfferPropertyComponent', () => {
  let component: OfferPropertyComponent;
  let fixture: ComponentFixture<OfferPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
