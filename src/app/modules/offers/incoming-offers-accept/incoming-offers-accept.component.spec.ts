import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingOffersAcceptComponent } from './incoming-offers-accept.component';

describe('IncomingOffersAcceptComponent', () => {
  let component: IncomingOffersAcceptComponent;
  let fixture: ComponentFixture<IncomingOffersAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingOffersAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingOffersAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
