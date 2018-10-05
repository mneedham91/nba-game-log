import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }
  //baseUrl: string = 'http://localhost:3000';
  baseUrl: string = '/api/v1';
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
