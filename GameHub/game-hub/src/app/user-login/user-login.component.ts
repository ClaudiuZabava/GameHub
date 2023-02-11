import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MiddlemanService } from '../services/middleman.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  badLogin!: boolean;
  constructor(private userAlert: AlertService, 
              private authService: AuthService,
              private middleman: MiddlemanService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new UntypedFormGroup(
      {
        userLogMail: new UntypedFormControl(null,Validators.required),
        userLogPass: new UntypedFormControl(null,Validators.required)
      }
    );
  }

  onLogIn()
  {
    this.badLogin = true;
    if(this.loginForm.valid)
    {
      this.badLogin = false;
      this.authService.loginUser(this.userLogMail.value, this.userLogPass.value);
      this.middleman.updateState();
      this.router.navigate(['/']);
      }
      else
      {
        this.userAlert.errorf("Wrong Email and/or Password !");
      }
  }

  // Getteri:

  get userLogMail(){
    return this.loginForm.get('userLogMail') as UntypedFormControl;
  }

  get userLogPass(){
    return this.loginForm.get('userLogPass') as UntypedFormControl;
  }

}
