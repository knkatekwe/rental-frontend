import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MAIN_URL } from './rental.service';

@Injectable()
export class OfferService {
	constructor(private http: HttpClient) {}

	getAllOffer(): Observable<any> {
		return this.http.get(MAIN_URL + '/offers');
	}

	getAllUserOffers(id: number): Observable<any> {
		return this.http.get(MAIN_URL + `/offers/${id}/user`);
	}

	getAllIncomingOffers(id: number): Observable<any> {
		return this.http.get(MAIN_URL + `/offers/${id}/incoming`);
	}

	getOffer(id: number): Observable<any> {
		return this.http.get(MAIN_URL + `/offers/${id}`);
	}

	saveOffer(offer): Observable<any> {
		return this.http.post(MAIN_URL + '/offers', offer);
	}

	updateOffer(id, offer): Observable<any> {
		return this.http.put(MAIN_URL + '/offers' + '/' + id, offer);
	}

	rejectOffer(id): Observable<any> {
		return this.http.post(MAIN_URL + `/offers/${id}/reject` , {});
	}

	cancelOffer(id): Observable<any> {
		return this.http.post(MAIN_URL + `/offers/${id}/cancel`, {});
	}

}
