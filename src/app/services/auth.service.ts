import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../core/models/app.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
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

  login(login: string, password: string): Observable<any> {
    const body = {
      login: login,
      password: password
    };
    return this.http.post<any>(`${this.apiUrl}/signin`, body)
      .pipe(
        tap((user: User) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('userLogin', login);
          this.currentUserSubject.next(user);
          this.setIsLoggedIn(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userLogin');
    const defaultUser: User = {
      name: '',
      login: '',
      password: ''
    };
    this.currentUserSubject.next(defaultUser);
    this.router.navigateByUrl('/welcome');
    this.setIsLoggedIn(false);
    console.log(this.isLoggedIn);

  }

  setIsLoggedIn(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }
}