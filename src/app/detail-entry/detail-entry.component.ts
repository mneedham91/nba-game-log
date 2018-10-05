import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntriesService } from '../entries.service';
import { UsersService } from '../users.service';
import { Entry } from '../entry';
import { User } from '../user';

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

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private entriesService: EntriesService,
    private usersService: UsersService) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.entriesService.getEntryById(this.id)
      .subscribe( data => {
        this.entry = data;
        this.usersService.getUserById(this.entry.userid)
          .subscribe( data => {
            this.entry_user = data;
          });
    });
    /*
  	this.entriesService.getEntryById(this.id)
      .subscribe( data => {
        this.entry = data;
    });
    this.usersService.getUserById(this.entry.userid)
      .subscribe( data => {
        this.entry_user = data;
      })
    */
  }

}
