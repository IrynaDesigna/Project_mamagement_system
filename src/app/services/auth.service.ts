import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, DecodedToken } from '../core/models/app.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn: Observable<boolean>;
  decodedToken!: DecodedToken;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.isLoggedIn = this.isLoggedInSubject.asObservable();

    if (this.currentUserValue) {
      this.setIsLoggedIn(true);
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  ngOnInit() {
    const isCookieExpired = this.cookieService.check('token') && this.cookieService.get('token') === '';
    if (isCookieExpired) {
      this.logout();
    }
  }

  decodeToken(token: string) {
    this.decodedToken = jwt_decode(token);
    console.log(this.decodedToken);
  }


  setCookie(name: string, exp: number, token: string) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + exp);
    this.cookieService.set(name, token, expirationDate);
  }

  login(login: string, password: string): Observable<any> {
    const body = {
      login: login,
      password: password
    };
    return this.http.post<any>(`${this.apiUrl}/signin`, body)
      .pipe(
        tap((user: User) => {
          if (user.token) {
            this.decodedToken = JSON.parse(atob(user.token.split('.')[1]));

            this.setCookie( 'token', this.decodedToken.exp, user.token );
            this.setCookie( 'userId', this.decodedToken.exp, this.decodedToken.id );
            this.setCookie( 'userLogin', this.decodedToken.exp, this.decodedToken.login );
          };

          this.userService.getUser(login);
          localStorage.setItem('userLogin', login);
          localStorage.setItem('checkingValue', password);
          this.currentUserSubject.next(user);
          this.setIsLoggedIn(true);
        })
      );
  }

  logout(): void {
    this.cookieService.deleteAll();
    localStorage.clear();
    const defaultUser: User = {
      name: '',
      login: '',
      password: ''
    };
    this.currentUserSubject.next(defaultUser);
    this.router.navigateByUrl('/welcome');
    this.setIsLoggedIn(false);
    console.log(this.getIsLoggedIn());

  }

  setIsLoggedIn(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }
}
