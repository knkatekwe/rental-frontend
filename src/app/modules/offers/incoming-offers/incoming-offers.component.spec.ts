import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingOffersComponent } from './incoming-offers.component';

describe('IncomingOffersComponent', () => {
  let component: IncomingOffersComponent;
  let fixture: ComponentFixture<IncomingOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
