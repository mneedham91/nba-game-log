import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) { }
  //baseUrl: string = 'http://localhost:3000';
  baseUrl: string = '/api/v1';

  public login(email: String, password: string) {
	  this.isLoggedIn.next(true);
	  return this.http.post(this.baseUrl + '/login', {email, password});
  }
  
  public logout() {
	  localStorage.clear();
	  this.isLoggedIn.next(false);
  }

  public setUsername(username) {
    localStorage.setItem('username', username);
    console.log('username received', username)
    this.username.next(username);
  }

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');

}
