import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Observable } from 'rxjs';
import { User } from '../core/models/app.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost:3000/auth';

  constructor(private httpService: HttpServiceService,) {}

  createUser(user: User): Observable<any> {
    const url = `/auth/signup`;
    return this.httpService.post(url, user);
  }
}
