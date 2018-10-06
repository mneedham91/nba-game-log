import { Component, OnInit, Input } from '@angular/core';
import { TeamsService } from '../teams.service';
import { Player } from '../player';

@Component({
  selector: 'app-player-select',
  templateUrl: './player-select.component.html',
  styleUrls: ['./player-select.component.css']
})
export class PlayerSelectComponent implements OnInit {
  @Input() homeTeam: string;
  @Input() awayTeam: string;
/*
  @Input() 
  set homeTeam(homeTeam: string) {
  	this.homeTeam = homeTeam;
  }
  get homeTeam(): string { return this.homeTeam }
  @Input() 
  set awayTeam(awayTeam: string) {
  	this.awayTeam = awayTeam;
  }
  get awayTeam(): string { return this.awayTeam }
*/

  homeRoster: Player[];
  awayRoster: Player[];

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
  }

}
