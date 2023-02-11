import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { MiddlemanService } from '../services/middleman.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuard implements CanActivate {
  constructor(private userAlert: AlertService,
              private middleman: MiddlemanService,
              private router: Router) { }

  canActivate()
  {
    if (this.middleman.currentStatus())
    {
      this.router.navigate(['/']);
      this.userAlert.errorf("You are already logged-in!");
      return false;
    }
    else
    {
      return true;
    }
  }
}