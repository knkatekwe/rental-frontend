import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OfferService } from 'src/app/core/services/offer.service';
import { RentalService } from 'src/app/core/services/rental.service';

@Injectable()
export class OfferResolver implements Resolve<any> {

constructor(private offerService: OfferService,
  private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.offerService.getOffer(route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }

}
