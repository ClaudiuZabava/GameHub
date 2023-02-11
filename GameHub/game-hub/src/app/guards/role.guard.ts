import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { MiddlemanService } from '../services/middleman.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private userAlert: AlertService,
    private middleman: MiddlemanService,
    private router: Router) { }


  canActivate()
  {
    if (this.middleman.currentStatus())
    {
      if(localStorage.getItem('token') == 'admin')
      {
        return true;
      }
      else
      {
        this.router.navigate(['/']);
        this.userAlert.errorf("You need to be an admin to access that page!");
        return false;
      }
    }
    else
    {
      this.router.navigate(['/user-login']);
      this.userAlert.errorf("You need to Login first to access that page!");
      return false;
    }
  }
  
}
