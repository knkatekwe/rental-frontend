import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export const MAIN_URL = environment.api_url

const URL = '/properties';

@Injectable()
export class RentalService {
	constructor(private http: HttpClient) {}

	getAllRental(): Observable<any> {
		return this.http.get(MAIN_URL + URL);
	}

	getAllUserProperites(id: number): Observable<any> {
		return this.http.get(MAIN_URL + `/properties/${id}/user`);
	}

	getRental(id: number): Observable<any> {
		return this.http.get(MAIN_URL +`/properties/${id}`);
	}

	saveRental(rental): Observable<any> {
		return this.http.post(MAIN_URL + URL, rental);
	}

	updateRental(id, rental): Observable<any> {
		return this.http.put(MAIN_URL + URL + '/' + id, rental);
	}

	request(id, request): Observable<any> {
		return this.http.post(MAIN_URL + URL + '/' + id + '/requests', request);
	}

	decision(id, decision): Observable<any> {
		return this.http.put(MAIN_URL + URL + '/' + id + '/decision', decision);
	}

	//the following are requests methods

	myRequests(id): Observable<any> {
		return this.http.get('http://localhost:1337/requests?user.id=' + id);
	}

	requestsToMe(id): Observable<any> {
		return this.http.get('http://localhost:1337/requests?rental.user.id=' + id);
	}

	updateRequest(id, data): Observable<any> {
		return this.http.put('http://localhost:1337/requests/' + id, data);
  }

  // the following are contract methods

	createContract(contract): Observable<any> {
		return this.http.post('http://localhost:1337/contracts', contract);
  }

  sign(id, contract): Observable<any> {
		return this.http.put('http://localhost:1337/contracts/' + id, contract);
	}

	contractsToMe(id): Observable<any> {
		return this.http.get('http://localhost:1337/contracts?rental.user.id=' + id);
	}

}
