import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Observable } from 'rxjs';
import { User } from '../core/models/app.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // localStorage = window.localStorage;

  constructor(private httpService: HttpServiceService,) {}

  createUser(user: User): Observable<any> {
    const url = `/auth/signup`;
    return this.httpService.post(url, user);
  }

  getUsers(): Observable<any> {
    const url = `/users`;
    return this.httpService.get(url);
  }

  getUser(userId: string): Observable<any> {
    const url = `/users/${userId}`;
    return this.httpService.get(url);
  }

  resetUser(userId: string, user: User): Observable<any> {
    const url = `/users/${userId}`;
    return this.httpService.put(url, user)
  }

  deleteUser(userId: string, user: User): Observable<any> {
    const url = `/users/${userId}`;
    return this.httpService.delete(url, user)
  }
}
