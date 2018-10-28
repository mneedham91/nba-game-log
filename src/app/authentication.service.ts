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

  public setUsername(username, userid, role) {
    localStorage.setItem('username', username);
    localStorage.setItem('userid', userid);
    this.username.next(username);
    this.userid.next(userid);
    if (role == 'admin') {
      this.admin.next(true);
    }
  }

  forgotPassword(email) {
    return this.http.post(this.baseUrl + '/forgot', {email});
  }

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public userid: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
