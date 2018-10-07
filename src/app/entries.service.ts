import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry } from './entry';
import { User } from './user';
import { AuthenticationService } from './authentication.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EntriesService {
	
  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  baseUrl: string = environment.baseUrl;
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
  	return this.http.put(this.baseUrl + '/entry/' + entry._id, entry, this.options);
  }

  deleteEntry(_id: string) {
  	return this.http.delete(this.baseUrl + '/entry/' + _id, this.options);
  }

  queryGamesLogged(user_id: string) {
    return this.http.get(this.baseUrl + '/entry/user/' + user_id + '/games');
  }

  queryQuartersWatched(user_id: string) {
    return this.http.get(this.baseUrl + '/entry/user/' + user_id + '/quarters');
  }
}
