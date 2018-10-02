import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  itemValue = new Subject();

  set token(value) {
    this.itemValue.next(value);
  	localStorage.setItem('token', value);
  }

  get token() {
  	return localStorage.getItem('token');
  }

  constructor() { }
}
