import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MiddlemanService } from '../services/middleman.service';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  loggedUserName!: string;
  
  constructor(private middleman: MiddlemanService,
              private alertify: AlertService,
              private authService: AuthService,
              private Router: Router) { }

  ngOnInit(): void {
  }


  testAlert()
  {
    this.alertify.successf('Success');
  }

  loggedin()
  {
    this.loggedUserName = localStorage.getItem('token') as string;
    this.middleman.updateState();
    return this.middleman.currentStatus();
  }


  LogOutUser()
  {
    this.middleman.updateState();
    this.authService.logoutUser();
  }

}
