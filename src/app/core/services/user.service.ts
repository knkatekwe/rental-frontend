import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { User, UserObject } from '../models/user';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/auth/current').subscribe(
        (data) => {
          this.setAuth1(data);
          console.log('tapfuura nepo king, token riripo!!!!!!');
        },
        (err) => {
          this.purgeAuth();
          console.log('tapfuura nepano, then purged the token!!!!!!');
        }
      );
      //console.log()
    } else {
      // Remove any potential remnants of previous auth states
      console.log('tabva tabvisa token racho repa localStorage!!!!!');
      this.purgeAuth();
    }
    console.log();
  }

  setAuth1(user: User) {
    //console.log('token has been set!')
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  setAuth(user) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    //console.log('token has been set!')
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  login(credentials: any): Observable<UserObject> {
    return this.apiService.post('/auth/signin', credentials).pipe(
      map((data) => {
        this.setAuth(data);
        //console.log(data)
        return data;
      })
    );
  }

  register(registrationData): Observable<any> {
    return this.apiService.post('/auth/signup', registrationData).pipe(
      map((registrationData) => {
        console.log(registrationData);
        return registrationData;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  getUser(): Observable<any> {
    return this.http.get('http://localhost:8100/api/v1/auth/current');
  }
}
