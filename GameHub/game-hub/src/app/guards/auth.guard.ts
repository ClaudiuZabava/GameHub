import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { MiddlemanService } from '../services/middleman.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userAlert: AlertService,
    private middleman: MiddlemanService,
    private router: Router) { }
    
  canActivate()
  {
    if (this.middleman.currentStatus())
    {
      return true;
    }
    else
    {
      this.router.navigate(['/user-login']);
      this.userAlert.errorf("You need to Login first to access that page!");
      return false;
    }
  }
  
}
