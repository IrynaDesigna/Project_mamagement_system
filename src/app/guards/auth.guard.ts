import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = !!localStorage.getItem('userLogin');
    const isOnWelcomePage = state.url.includes('/welcome');
    if (isLoggedIn && (state.url.includes('/login') || state.url.includes('/signup') || state.url.includes('/welcome'))) {
      this.router.navigate(['/main']);
      return false;
    }
    if (!isLoggedIn && !isOnWelcomePage && (state.url.includes('/login') || state.url.includes('/signup'))) {
      return true;
    } else if (!isLoggedIn && !isOnWelcomePage) {
      this.router.navigate(['/welcome']);
      return false;
    }
    return true;
  }

}
