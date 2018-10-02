import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../entries.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Entry } from '../entry';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
  lengthOptions: [];

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private entriesService: EntriesService
  ) { }

  ngOnInit() {
    this.lengthOptions = [0, 1, 2, 3, 4];
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  	this.editForm = this.formBuilder.group({
      _id: [''],
  		home: ['', Validators.required],
  		away: ['', Validators.required],
      length: ['', Validators.required],
      date: [],
      created_at: [],
      updated_at: [],
      __v: [],
  		notes: ['', Validators.required]
  	});
  	this.entriesService.getEntryById(this.id)
  	  .subscribe( data => {
  	  	this.editForm.setValue(data);
        this.editForm.controls['_id'].setValue(this.id);
  	  });
  }

  onSubmit() {
    console.log(this.editForm.value);
  	this.entriesService.updateEntry(this.editForm.value)
  	  //.pipe(first())
  	  .subscribe(
  	  	data => {
  	  		this.router.navigate(['detail-entry', this.id]);
  	  	},
  	  	error => {
  	  		alert(error);
  	  	});
  }

}
