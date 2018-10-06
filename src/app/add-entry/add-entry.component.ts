import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntriesService } from '../entries.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Team } from '../team';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {
  lengthOptions: Array<number>;
  public teams: Team[];
  players: string[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private entriesService: EntriesService,
    private teamsService: TeamsService) 
  {
    this.lengthOptions = [0, 1, 2, 3, 4];
  }

  addForm: FormGroup;

  ngOnInit() {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.teamsService.getJSON()
      .subscribe(result => {
        this.teams = result as Team[];
      }, error => console.error(error));

  	this.addForm = this.formBuilder.group({
  	  home: ['', Validators.required],
  	  away: ['', Validators.required],
      date: [currentDate, Validators.required],
      length: ['', Validators.required],
  	  notes: ['', Validators.required]
  	});
  }

  onSubmit() {
  	this.entriesService.createEntry(this.addForm.value)
  	  .subscribe( data => {
  	  	this.router.navigate(['entries']);
  	  });
  }

  onNotifyAdd(message: string) {
    this.players.push(message);
    console.log('players',this.players);
  }

  onNotifyRemove(message: string) {
    let index = this.players.indexOf(message);
    if (index > -1) { this.players.splice(index, 1); }
    console.log('players',this.players);
  }

}
