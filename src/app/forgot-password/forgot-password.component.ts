import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  submitted: boolean = false;
  invalid: boolean = false;

  constructor(
  	private formBuilder: FormBuilder,
  	private router: Router,
  	private authService: AuthenticationService) { }

  onSubmit() {
  	this.submitted = true;
  	if (this.forgotPasswordForm.invalid) {
  		return;
  	}
	  this.authService.forgotPassword(this.forgotPasswordForm.controls.email.value).subscribe( 
        data => {
          this.router.navigate(['login']);
        },
        error => {
          this.invalid = true;
        });
  }

  ngOnInit() {
  	this.forgotPasswordForm = this.formBuilder.group({
  		email: ['', Validators.required]
  	});
  }

}
