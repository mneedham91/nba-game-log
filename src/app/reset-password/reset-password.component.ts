import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { PasswordValidation } from '../password-validation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  invalid: boolean = false;
  submitted: boolean = false;
  resetPasswordForm: FormGroup;
  private sub: any;
  token: string;
  validtoken: boolean;

  constructor(
  	private formBuilder: FormBuilder,
  	private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthenticationService) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
      this.token = params['token'];
      this.authService.checkToken(this.token).subscribe(data => {
      	if (data['status'] == 'valid') {
      		this.validtoken = true;
      	} else {
      		this.validtoken = false;
      	}
      });
    });
  	this.resetPasswordForm = this.formBuilder.group({
  		password: ['', Validators.required],
        confirmpassword: ['', Validators.required]
  	}, {
      validator: PasswordValidation.MatchPassword
    })
  }

  onSubmit() {
  	this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
  	this.authService.resetPassword(this.resetPasswordForm.value.password, this.token)
  	  .subscribe( data => {
  	  	this.router.navigate(['login']);
  	  });
  }

}
