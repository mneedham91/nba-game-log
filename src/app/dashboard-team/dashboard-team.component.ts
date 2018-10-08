import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamsService } from '../teams.service';
import { Entry } from '../entry';
import { EntriesService } from '../entries.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard-team',
  templateUrl: './dashboard-team.component.html',
  styleUrls: ['./dashboard-team.component.css']
})
export class DashboardTeamComponent implements OnInit {
  teams: Team[];
  username: string;

  constructor(
  	private teamsService: TeamsService,
  	private entriesService: EntriesService,
  	private authService: AuthenticationService
  	) { }

  ngOnInit() {
  	this.authService.username.subscribe( value => {
      this.username = value;
    });
  	this.teamsService.getJSON()
      .subscribe(result => {
        this.teams = result as Team[];
        this.entriesService.queryGamesLogged(this.username, 'CHI')
          .subscribe( data => {
          	for (let i = 0; i < this.teams.length; i++) {
          	  this.teams[i].games_logged = data[this.teams[i].team];
          	}
          });
        this.entriesService.queryQuartersWatched(this.username, 'CHI')
          .subscribe( data => {
          	for (let i = 0; i < this.teams.length; i++) {
          	  this.teams[i].quarters_watched = data[this.teams[i].team];
          	}
          });	 
      }, error => console.error(error));
  }
}
