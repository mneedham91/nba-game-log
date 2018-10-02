import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) {
  	this.getJSON().subscribe(data => {
  		console.log(data)
  	});
  }

  public getJSON(): Observable<any> {
  	return this.http.get<Array<Team>>('./assets/nba_teams.json')
  }
}
