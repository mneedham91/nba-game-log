import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntriesService } from '../entries.service';
import { Entry } from '../entry';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
	entries: Entry[];
  loggedIn: boolean;
  mobile: boolean;

  constructor(private router: Router, private entriesService: EntriesService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe( value => {
      this.loggedIn = value;
    });
    this.entriesService.getEntries()
      .subscribe( data => {
        this.entries = data;
      });
    if (window.screen.width === 360) {
      this.mobile = true;
    }
  }

  deleteEntry(entry: Entry): void {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.entriesService.deleteEntry(entry._id)
        .subscribe( data => {
          this.entries = this.entries.filter(e => e !== entry);
        })
    }
  };

  editEntry(entry: Entry): void {
    this.router.navigate(['edit-entry', entry._id]);
  };

  viewEntry(entry: Entry): void {
    this.router.navigate(['detail-entry', entry._id])
  }

  addEntry(): void {
    this.router.navigate(['add-entry']);
  };
}
