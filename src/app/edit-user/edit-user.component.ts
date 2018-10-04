import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id: string;
  private sub: any;
  user: User;
  editUserForm: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private usersService: UsersService
  ) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  	this.editUserForm = this.formBuilder.group({
  	  _id: [''],
  	  email: [''],
  	  password: [],
  	  username: [''],
  	  first_name: [''],
  	  last_name: [''],
  	  created_at: [],
  	  updated_at: [],
  	  __v: [],
  	});
  	this.usersService.getUserById(this.id)
  	  .subscribe( data => {
        console.log('getUserById ', data);
  	  	this.editUserForm.setValue(data);
        this.user = data;
  	  });
  }

  onSubmit() {
  	this.usersService.updateUser(this.editUserForm.value)
  	  .subscribe(
  	  	data => {
  	  		this.router.navigate(['detail-user', this.id]);
  	  	},
  	  	error => {
  	  		alert(error);
  	  	});
  }

}
