import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  loggedIn: boolean;
  token: string;

  constructor(private router: Router, private authService: AuthenticationService, protected localStorage: LocalStorage) {
    this.localStorage.getItem('token').subscribe((token) => {
      if (token) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  onLogOutClick() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  ngOnInit() { }

}
