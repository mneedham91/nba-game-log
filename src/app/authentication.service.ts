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

  getUsers() {
  	return this.http.get<User[]>(this.baseUrl + '/user');
  }

  getUserById(_id: string) {
  	return this.http.get<User>(this.baseUrl + '/user/' + _id);
  }

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

  createUser(user: User) {
  	return this.http.post(this.baseUrl + '/user', user);
  }

  updateUser(user: User) {
  	return this.http.put(this.baseUrl + '/user/' + user._id, user);
  }

  deleteUser(_id: string) {
  	return this.http.delete(this.baseUrl + '/user/' + _id);
  }
}
