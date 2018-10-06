import { Component, OnChanges, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
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
  @Output() notifyAdd: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyRemove: EventEmitter<string> = new EventEmitter<string>();
  roster: Player[];

  constructor(private playersService: PlayersService) { }

  ngOnChanges(changes: SimpleChanges) {
  	if (this.team) {
  	  this.playersService.getTeam(this.team).subscribe( data => {
  	    this.roster = data;
  	  });
  	}
  }

  onClick(pId) {
  	let pickedPlayerIndex = this.roster.findIndex(p => p._id == pId);
  	this.roster[pickedPlayerIndex].selected = !this.roster[pickedPlayerIndex].selected;
  	if (this.roster[pickedPlayerIndex].selected) {
  		this.notifyAdd.emit(this.roster[pickedPlayerIndex]._id);
  	} else {
  		this.notifyRemove.emit(this.roster[pickedPlayerIndex]._id);
  	}
  }

}
