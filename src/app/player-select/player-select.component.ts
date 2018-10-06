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
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
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
  	console.log('to_emit',this.roster[pickedPlayerIndex]._id)
  	this.notify.emit(this.roster[pickedPlayerIndex]._id);
  }

}
