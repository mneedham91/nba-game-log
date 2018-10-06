import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { PlayersService } from '../players.service';
import { Player } from '../player';
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-player-select',
  templateUrl: './player-select.component.html',
  styleUrls: ['./player-select.component.css']
})
export class PlayerSelectComponent implements OnChanges {
  @Input() team: string;
  roster: Player[];

  constructor(private playersService: PlayersService) { }

  ngOnChanges(changes: SimpleChanges) {
  	console.log(changes);
  	this.playersService.getTeam(this.team).subscribe( data => {
  		this.roster = data;
  	});
  }

}
