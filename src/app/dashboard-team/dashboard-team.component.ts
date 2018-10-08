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
        for (let t = 0; t < this.teams.length; t++) {
          this.entriesService.queryGamesLogged(this.username, this.teams[t].team)
            .subscribe( data => {
              console.log(data);
              this.teams[t].games_logged = data['games'];
          }, error => console.error(error));
          this.entriesService.queryQuartersWatched(this.username, this.teams[t].team)
            .subscribe( data => {
              this.teams[t].quarters_watched = data['quarters'];
          }, error => console.error(error));   
        }
      });
    }
  }
