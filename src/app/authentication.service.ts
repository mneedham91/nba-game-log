import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

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
    this.username.next(username);
  }

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');

}
