import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthenticationService,
    protected localStorage: LocalStorage) { }

  onSubmit() {
  	this.submitted = true;
  	if (this.loginForm.invalid) {
  		return;
  	}
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe( 
        data => {
          //localStorage.setItem('token', data['token']);
          this.localStorage.setItem('token', data['token']).subscribe(() => {});
          this.router.navigate(['entries']);
        },
        error => {
          this.invalidLogin = true;
        });
  }

  ngOnInit() {
  	this.loginForm = this.formBuilder.group({
  		email: ['', Validators.required],
  		password: ['', Validators.required]
  	});
  }
}
