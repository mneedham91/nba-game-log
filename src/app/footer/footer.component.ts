import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  loggedIn: boolean;
  token: string;

  constructor(private router: Router, private authService: AuthenticationService) {
	  this.authService.isLoggedIn.subscribe( value => {
		  this.loggedIn = value;
	  });
  }

  onLogOutClick() {
	  this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnInit() { }

}
