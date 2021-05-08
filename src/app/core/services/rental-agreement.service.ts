import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MAIN_URL } from './rental.service';

@Injectable()
export class RentalAgreementService {
	constructor(private http: HttpClient) {}

	getAllRentalAgreement(): Observable<any> {
		return this.http.get(MAIN_URL + '/rental agreements');
	}

	getAllUserRentalAgreements(id: number): Observable<any> {
		return this.http.get(MAIN_URL + `/rental-agreements/${id}/user`);
	}

	getRentalAgreementForOffer(id: number): Observable<any> {
		return this.http.get(MAIN_URL + `/rental-agreements/${id}/offer`);
	}

	getAllIncomingRentalAgreements(id: number): Observable<any> {
		return this.http.get(MAIN_URL + `/rental-agreements/${id}/incoming`);
	}

	getRentalAgreement(id): Observable<any> {
		return this.http.get(MAIN_URL + `/rental-agreements/${id}`);
	}

	saveRentalAgreement(rentalAgreement): Observable<any> {
		return this.http.post(MAIN_URL + '/rental-agreements', rentalAgreement);
	}

	updateRentalAgreement(id, rentalAgreement): Observable<any> {
		return this.http.put(MAIN_URL + '/rental-agreements' + '/' + id, rentalAgreement);
	}

	cancelRentalAgreement(rentalAgreementId, offerId): Observable<any> {
		return this.http.post(MAIN_URL + `/rental-agreements/${rentalAgreementId}/${offerId}/cancel`, {});
	}

	acceptRentalAgreement(id): Observable<any> {
		return this.http.post(MAIN_URL + `/rental-agreements/${id}/accept`, {});
	}

	rejectRentalAgreement(id): Observable<any> {
		return this.http.post(MAIN_URL + `/rental-agreements/${id}/reject`, {});
	}

}
