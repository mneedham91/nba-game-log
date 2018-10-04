import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  itemValue = new Subject();

  set theItem(value) {
    this.itemValue.next(value);
  	localStorage.setItem('theItem', value);
  }

  get theItem() {
  	return localStorage.getItem('theItem');
  }

  constructor() { }
}
