import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RentalService } from 'src/app/core/services/rental.service';

@Injectable()
export class RentalResolver implements Resolve<any> {

constructor(private rentalService: RentalService,
  private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.rentalService.getRental(route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }

}
