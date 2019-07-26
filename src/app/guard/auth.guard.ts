import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
      return false;
    }

    if (
      this.loginService.isAuthenticate ||
      localStorage.getItem('token').length > 10
    ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
