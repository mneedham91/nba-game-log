import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) { }
  //baseUrl: string = 'http://localhost:3000';
  baseUrl: string = '/api/v1';

  login(email: String, password: string) {
    return this.http.post(this.baseUrl + '/login', {email, password});
  }

  isLoggedIn() {
    let a = localStorage.getItem('token');
    if (a) {
      return true;
    } else {
      return false;
    }
  }

}
