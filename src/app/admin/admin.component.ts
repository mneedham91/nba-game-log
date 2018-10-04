import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
  }

  deleteUser(user: User): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(user._id)
        .subscribe( data => { })
    }
  };

  editUser(user: User): void {
    this.router.navigate(['edit-user', user._id]);
  };

  viewUser(user: User): void {
    this.router.navigate(['detail-user', user._id])
  }
  
}
