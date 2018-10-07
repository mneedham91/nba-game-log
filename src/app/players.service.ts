import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from './player';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;
  headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
  options: {} = { headers: this.headers };

  getPlayers() {
  	return this.http.get<Player[]>(this.baseUrl + '/player');
  }

  getPlayerById(_id: string) {
  	return this.http.get<Player>(this.baseUrl + '/player/' + _id);
  }

  getTeam(team: string) {
  	return this.http.get<Player[]>(this.baseUrl + '/team/' + team);
  }
}
