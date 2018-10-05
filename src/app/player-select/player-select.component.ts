import { Component, OnInit, Input } from '@angular/core';
import { TeamsService } from '../teams.service';
import { Player } from '../player';

@Component({
  selector: 'app-player-select',
  templateUrl: './player-select.component.html',
  styleUrls: ['./player-select.component.css']
})
export class PlayerSelectComponent implements OnInit {
  @Input('home') homeTeam: string;
  @Input('away') awayTeam: string;
  homeRoster: Player[];
  awayRoster: Player[];

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
  }

}
