import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) { }
  //baseUrl: string = 'http://localhost:3000';
  baseUrl: string = '/api/v1';

  public login(email: String, password: string): Observable<boolean> {
	return this.http.post(this.baseUrl + '/login', {email, password}).subscribe(
	  data => {
	    this.isLoggedIn.next(true);
	    localStorage.setItem('token', data['token']);
	    localStorage.setItem('userid', data['userid']);
		console.log('this worked I promise');
	    return true;
	  },
	  error => {
		console.log('pysch!');
		return false;
	  });
	/*
	this.isLoggedIn.next(true);
	return this.http.post(this.baseUrl + '/login', {email, password});
	*/
  }
  
  public logout() {
	localStorage.clear();
	this.isLoggedIn.next(false);
  }

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
