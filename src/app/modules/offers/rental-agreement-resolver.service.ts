import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RentalAgreementService } from 'src/app/core/services/rental-agreement.service';


@Injectable()
export class RentalAgreementResolver implements Resolve<any> {

constructor(private rentalAgreementService: RentalAgreementService,
  private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.rentalAgreementService.getRentalAgreementForOffer(route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }

}
