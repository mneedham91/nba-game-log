import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  invalid: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private usersService: UsersService) { }

  registerForm: FormGroup;

  ngOnInit() {

  	this.registerForm = this.formBuilder.group({
  		email: ['', [Validators.required, Validators.email]],
  		password: ['', Validators.required]
  	})
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  	this.usersService.createUser(this.registerForm.value)
  	  .subscribe( data => {
  	  	this.router.navigate(['login']);
  	  });
  }

}
