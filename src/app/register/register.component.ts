import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) { }

  registerForm: FormGroup;

  ngOnInit() {

  	this.registerForm = this.formBuilder.group({
  		email: ['', Validators.required],
  		password: ['', Validators.required]
  	})
  }

  onSubmit() {
  	this.authenticationService.createUser(this.registerForm.value)
  	  .subscribe( data => {
  	  	this.router.navigate(['entries']);
  	  });
  }

}
