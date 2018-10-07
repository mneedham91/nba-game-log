import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntriesService } from '../entries.service';
import { TagsService } from '../tags.service';
import { PlayersService } from '../players.service';
import { UsersService } from '../users.service';
import { Entry } from '../entry';
import { Player } from '../player';
import { User } from '../user';
import { Tag } from '../tag';

@Component({
  selector: 'app-detail-entry',
  templateUrl: './detail-entry.component.html',
  styleUrls: ['./detail-entry.component.css']
})
export class DetailEntryComponent implements OnInit {
  id: string;
  entry_user: User;
  private sub: any;
  entry: Entry;
  players: Player[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private entriesService: EntriesService,
    private usersService: UsersService,
    private tagsService: TagsService,
    private playersService: PlayersService) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.entriesService.getEntryById(this.id)
      .subscribe( data => {
        this.entry = data;
        this.tagsService.getTagsByEntry(this.id)
          .subscribe( data => {
            let tags: Tag[] = data;
            for (let i = 0; i < tags.length; i++) {
              this.playersService.getPlayerById(tags[i].playerid)
                .subscribe( data => {
                  this.players.push(data);
                });
            }
          });
        this.usersService.getUserById(this.entry.userid)
          .subscribe( data => {
            this.entry_user = data;
          });
    });
  }

}
