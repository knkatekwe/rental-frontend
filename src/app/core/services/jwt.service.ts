import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwt'];
  }

  saveToken(token: String) {
    window.localStorage['jwt'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwt');
  }

}
