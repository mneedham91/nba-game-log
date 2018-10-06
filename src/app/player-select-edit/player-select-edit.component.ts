import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Player } from '../player';
import { Tag } from '../tag';
import { PlayersService } from '../players.service';
import { ActivatedRoute } from '@angular/router';
import { EntriesService } from '../entries.service';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-player-select-edit',
  templateUrl: './player-select-edit.component.html',
  styleUrls: ['./player-select-edit.component.css']
})
export class PlayerSelectEditComponent implements OnInit {
  @Output() notifyAdd: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyRemove: EventEmitter<string> = new EventEmitter<string>();
  roster: Player[];
  selectedPlayers: string[];
  public home: boolean;
  id: string;
  private sub: any;
  team: string;

  constructor(
  	private playersService: PlayersService, 
  	private route: ActivatedRoute,
  	private entriesService: EntriesService,
  	private tagsService: TagsService) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.tagsService.getTagsByEntry(this.id).subscribe( data => {
      	let tags: Tag[] = data;
        for (let i = 0; i < tags.length; i++) {
          this.selectedPlayers.push(tags[i].playerid)
        }
      });
      this.entriesService.getEntryById(this.id).subscribe( data => {
      	if (this.home) {
      	  this.team = data.home;
      	  this.playersService.getTeam(this.team).subscribe( data => {
  	        this.roster = data;
  	        for (let i = 0; i < this.roster.length; i++) {
  	          for (let z = 0; i < this.selectedPlayers.length; z++) {
  	          	if (this.roster[i]._id == this.selectedPlayers[z]) {
  	          		this.roster[i].selected = true;
  	          	}
  	          }
  	        }
  	      });
      	} else {
      	  this.team = data.away;
      	  this.playersService.getTeam(this.team).subscribe( data => {
  	        this.roster = data;
  	  	  });
      	}
      });
    });

    
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
