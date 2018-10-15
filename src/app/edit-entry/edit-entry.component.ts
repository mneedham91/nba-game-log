import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../entries.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Entry } from '../entry';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Team } from '../team';
import { TeamsService } from '../teams.service';
import { TagsService } from '../tags.service';
import { Tag } from '../tag';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent implements OnInit {
  id: string;
  private sub: any;
  entry: Entry;
  editForm: FormGroup;
  lengthOptions: Array<number>;
  public teams: Team[];
  players: string[] = [];
  away: string;
  home: string;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private entriesService: EntriesService,
    private teamsService: TeamsService,
    private tagsService: TagsService
  ) { 
    this.lengthOptions = [0, 1, 2, 3, 4];
  }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.teamsService.getJSON()
      .subscribe(result => {
        this.teams = result as Team[];
      }, error => console.error(error));
  	this.editForm = this.formBuilder.group({
      _id: [''],
  		home: ['', Validators.required],
  		away: ['', Validators.required],
      length: ['', Validators.required],
      date: [],
      created_at: [],
      updated_at: [],
      __v: [],
      userid: [],
  		notes: ['', Validators.required]
  	});
  	this.entriesService.getEntryById(this.id)
  	  .subscribe( data => {
  	  	this.editForm.setValue(data);
        this.editForm.controls['_id'].setValue(this.id);
        this.home = data['home'];
        this.away = data['away'];
        this.tagsService.getTagsByEntry(this.id)
          .subscribe( data => {
            let tags: Tag[] = data;
            for (let i = 0; i < tags.length; i++) {
              this.players.push(tags[i].playerid);
            }
          });
  	  });
  }

  onSubmit() {
  	this.entriesService.updateEntry(this.editForm.value)
  	  .subscribe(
  	  	data => {
          this.tagsService.updateTags(this.id, this.players);
  	  		this.router.navigate(['detail-entry', this.id]);
  	  	},
  	  	error => {
  	  		alert(error);
  	  	});
  }

  onNotifyAdd(message: string) {
    this.players.push(message);
  }

  onNotifyRemove(message: string) {
    let index = this.players.indexOf(message);
    if (index > -1) { this.players.splice(index, 1); }
  }

}
