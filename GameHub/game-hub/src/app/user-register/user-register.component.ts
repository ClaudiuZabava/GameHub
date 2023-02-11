import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IUser } from 'src/app/model/IUser.interface';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  registerForm!: UntypedFormGroup;
  utilizator!: IUser;
  badSubmit!: boolean;

  constructor(private authService: AuthService, 
              private userAlert: AlertService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new UntypedFormGroup(
      {
        userName: new UntypedFormControl(null,Validators.required),
        userEmail: new UntypedFormControl(null,[Validators.required,Validators.email]),
        userPass: new UntypedFormControl(null,[Validators.minLength(8),Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
        userConfirmPass: new UntypedFormControl(null,Validators.required)
      }, this.passMatchingValidator
    );
  }


  // Validator custom: verificam ca doua campuri din form sa aibe aceeasi valoare.
  passMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('userPass')?.value === fc.get('userConfirmPass')?.value ? null :
      { notmatched: true }
  };

  onRegSub()
  {
    //console.log(this.registerForm);
    this.badSubmit = true;
    if(this.registerForm.valid)
    {
      this.badSubmit = false;
      // Frem sa salvam anumite date ( ex: nu ne trebuie si inputul din confirm pass)
      this.authService.registerUser(this.userName.value, this.userEmail.value, this.userPass.value);
      this.registerForm.reset();
      this.router.navigate(['/user-login']);
    }
    else
    {
      this.userAlert.errorf("Requested fields are empty or incorrect!")
    }
  }

  // Getteri folositi in .html:
  get userName(){
    return this.registerForm.get('userName') as UntypedFormControl;
  }

  get userEmail(){
    return this.registerForm.get('userEmail') as UntypedFormControl;
  }

  get userPass(){
    return this.registerForm.get('userPass') as UntypedFormControl;
  }

  get userConfirmPass(){
    return this.registerForm.get('userConfirmPass') as UntypedFormControl;
  }


}
