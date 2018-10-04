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

  login(email: String, password: string) {
	/*
	return this.http.post(this.baseUrl + '/login', {email, password}).subscribe(hero => {
		this.isLoggedIn.next(true);
	}
    return resp;
	*/
	this.isLoggedIn.next(true);
	return this.http.post(this.baseUrl + '/login', {email, password});
  }

  public isLoggedIn(): BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
