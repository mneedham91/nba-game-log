import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntriesService } from '../entries.service';
import { Entry } from '../entry';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
	entries: Entry[];

  constructor(private router: Router, private entriesService: EntriesService) { }

  ngOnInit() {
    this.entriesService.getEntries()
      .subscribe( data => {
        this.entries = data;
      });
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
    localStorage.removeItem('editEntryId');
    localStorage.setItem('editEntryId', entry._id);
    this.router.navigate(['edit-entry', entry._id]);
  };

  viewEntry(entry: Entry): void {
    this.router.navigate(['detail-entry', entry._id])
  }

  addEntry(): void {
    this.router.navigate(['add-entry']);
  };
}
