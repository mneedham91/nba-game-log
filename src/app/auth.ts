import {Observable} from 'rxjs/Observable';

export class Auth {
  constructor() {
    this.loggedIn = false;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  check() {
    return Observable.of(this.loggedIn);
  }
}