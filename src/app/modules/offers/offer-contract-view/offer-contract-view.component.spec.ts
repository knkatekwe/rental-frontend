import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferContractViewComponent } from './offer-contract-view.component';

describe('OfferContractViewComponent', () => {
  let component: OfferContractViewComponent;
  let fixture: ComponentFixture<OfferContractViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferContractViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferContractViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
