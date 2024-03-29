import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Task } from '../core/models/app.model';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  localStorage = window.localStorage;
  tokenValue: string = this.cookieService.get("token").split('=')[0].split(',')[0];

  private baseUrl = 'https://finalproject-backend-production.up.railway.app';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private userHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.tokenValue}`);



  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    ) { }

  // public get(url: string, options?: any): Observable<any> {
  //   console.log(this.tokenValue);

  //   return this.http.get(`${this.baseUrl}${url}`, { headers: this.userHeaders, ...options });
  // }

  public get(url: string, options?: any): Observable<any> {
    const token = this.cookieService.get('token');

    if (token) {
      this.userHeaders = new HttpHeaders().set('Authorization', `Bearer ${token.split('=')[0].split(',')[0]}`);
      return this.http.get(`${this.baseUrl}${url}`, { headers: this.userHeaders, ...options });
    } else {
      // Wait for token to be available
      return new Observable((observer) => {
        const waitToken = () => {
          const token = this.cookieService.get('token');
          if (token) {
            this.userHeaders = new HttpHeaders().set('Authorization', `Bearer ${token.split('=')[0].split(',')[0]}`);
            observer.next(this.http.get(`${this.baseUrl}${url}`, { headers: this.userHeaders, ...options }));
          } else {
            setTimeout(waitToken, 100);
          }
        };

        waitToken();
      });
    }
  }

  public delete(url: string, options?: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}${url}`, { headers: this.userHeaders, ...options });
  }

  public post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${url}`, body, { headers: this.userHeaders, ...options });
  }

  public put(url: string, body: any, options?: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${url}`, body, { headers: this.userHeaders, ...options })
  }

  public patch(url: string, body: any, options?: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}${url}`, body, { headers: this.userHeaders, ...options })
  }
}
