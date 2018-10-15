import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedIn: boolean;
  userid: string;

  constructor(private authService: AuthenticationService) {
  	this.authService.isLoggedIn.subscribe( value => {
		  this.loggedIn = value;
	  }); 
    this.authService.userid.subscribe( value => {
      this.userid = value;
    });
  	}

  ngOnInit() {
  }

}
