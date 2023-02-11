import { Injectable } from '@angular/core';
import { updateProfile } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { from, switchMap } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private fireauth: AngularFireAuth,
              private alertService: AlertService,
              private router: Router) { }

  registerUser(name: string, email: string, password: string)
  {
    // register user by email and password with AngularFireAuth
    // then update the profile with the name
    this.fireauth.createUserWithEmailAndPassword(email, password).then( () => {
      this.alertService.successf("User registered successfully!");
      this.fireauth.currentUser.then( user => {
        updateProfile(user!, {
          displayName: name
        });
      });

    }, err => {
      this.alertService.errorf(err.message);
      this.router.navigate(['/user-register']);
    });
  }

  loginUser(email: string, password: string)
  {
    this.fireauth.signInWithEmailAndPassword(email, password).then( () => {
      this.alertService.successf("Logged-In Successfully !");
      localStorage.setItem('token', email.split('@')[0]);
    }).catch(_err => {
      this.alertService.errorf("Wrong Email and/or Password !");
      this.router.navigate(['/user-login']);
    }) ;
  }

  logoutUser()
  {
    this.fireauth.signOut().then( () => {
      this.alertService.successf("User logged-out successfully!");
      localStorage.removeItem('token');
    }, err => {
      this.alertService.errorf(err.message);
    });
  }
}
