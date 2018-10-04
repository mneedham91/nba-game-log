import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry } from './entry';

@Injectable({
  providedIn: 'root'
})

export class EntriesService {
	
  constructor(private http: HttpClient) { }
  //baseUrl: string = 'http://localhost:3000';
  baseUrl: string = '/api/v1';
  headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
  options: {} = { headers: this.headers };

  getEntries() {
  	return this.http.get<Entry[]>(this.baseUrl + '/entry', this.options);
  }

  getEntryById(_id: string) {
  	return this.http.get<Entry>(this.baseUrl + '/entry/'+ _id);
  }

  createEntry(entry: Entry) {
	entry.userid = localStorage.getItem('userid');
  	return this.http.post(this.baseUrl + '/entry', entry, this.options);
  }

  updateEntry(entry: Entry) {
    console.log(entry);
  	return this.http.put(this.baseUrl + '/entry/' + entry._id, entry, this.options);
  }

  deleteEntry(_id: string) {
  	return this.http.delete(this.baseUrl + '/entry/' + _id, this.options);
  }
}
