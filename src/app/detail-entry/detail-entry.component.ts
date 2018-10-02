import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntriesService } from '../entries.service';
import { Entry } from '../entry';

@Component({
  selector: 'app-detail-entry',
  templateUrl: './detail-entry.component.html',
  styleUrls: ['./detail-entry.component.css']
})
export class DetailEntryComponent implements OnInit {
  id: string;
  private sub: any;
  entry: Entry;

  constructor(private route: ActivatedRoute, private router: Router, private entriesService: EntriesService) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  	this.entriesService.getEntryById(this.id)
      .subscribe( data => {
        this.entry = data;
    });
  }

}
