import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = !!localStorage.getItem('userLogin'); // Check if user information exists in localStorage
    const isOnWelcomePage = state.url.includes('/welcome'); // Check if the user is on the welcome page
    if (!isLoggedIn && !isOnWelcomePage) {
      this.router.navigate(['/welcome']); // Redirect the user to the welcome page if they're not signed in and not on the welcome page
      return false;
    }
    return true;
  }

}
