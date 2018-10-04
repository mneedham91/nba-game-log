import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { isLoggedIn } from './isLoggedIn';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
	this.loggedIn = isLoggedIn(next, previous);
})
export class FooterComponent implements OnInit {
  loggedIn: boolean;
  token: string;

  constructor(private router: Router, private authService: AuthenticationService) { }

  onLogOutClick() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  ngOnInit() { }

}
