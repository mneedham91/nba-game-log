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
  userid: string;
  existingSortMethod: string = 'quarters';
  descending: boolean = true;

  constructor(
  	private teamsService: TeamsService,
  	private entriesService: EntriesService,
  	private authService: AuthenticationService
  	) { }

  ngOnInit() {
  	this.authService.userid.subscribe( value => {
      this.userid = value;
    });
  	this.teamsService.getJSON()
      .subscribe(result => {
        this.teams = result as Team[];
        for (let t = 0; t < this.teams.length; t++) {
          console.log(this.userid);
          this.entriesService.queryGamesLogged(localStorage.getItem('userid'), this.teams[t].team)
            .subscribe( data => {
              this.teams[t].games_logged = data['games'];
          }, error => console.error(error));
          this.entriesService.queryQuartersWatched(localStorage.getItem('userid'), this.teams[t].team)
            .subscribe( data => {
              this.teams[t].quarters_watched = data['quarters'];
          }, error => console.error(error));   
        }
      });
  }

  sortTeamDescending() {
    return this.teams.sort(function(a, b){
      var x = a.team.toLowerCase();
      var y = b.team.toLowerCase();
      if (x < y) {return 1;}
      if (x > y) {return -1;}
      return 0;
    });
  }

  sortTeamAscending() {
    return this.teams.sort(function(a, b){
      var x = a.team.toLowerCase();
      var y = b.team.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
  }

  sortQuartersDescending() {
    return this.teams.sort(function(a, b){return a.quarters_watched - b.quarters_watched});
  }

  sortQuartersAscending() {
    return this.teams.sort(function(a, b){return b.quarters_watched - a.quarters_watched});
  }

  sortGamesDescending() {
    return this.teams.sort(function(a, b){return b.games_logged - a.games_logged});
  }

  sortGamesAscending() {
    return this.teams.sort(function(a, b){return a.games_logged - b.games_logged});
  }

  sort(sortMethod) {
    if (sortMethod == this.existingSortMethod) {
      this.descending = !this.descending;
    }
    if (sortMethod == 'team') {
      if (this.descending) {
        this.teams = this.sortTeamDescending();
      } else {
        this.teams = this.sortTeamAscending();
      }
    } else if (sortMethod == 'games') {
      if (this.descending) {
        this.teams = this.sortGamesDescending();
      } else {
        this.teams = this.sortGamesAscending();
      }
    } else if (sortMethod == 'quarters') {
      if (this.descending) {
        this.teams = this.sortQuartersDescending();
      } else {
        this.teams = this.sortQuartersAscending();
      }
    }
    this.existingSortMethod = sortMethod;
  }
}

