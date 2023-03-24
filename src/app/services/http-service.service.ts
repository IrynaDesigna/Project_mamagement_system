import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  localStorage = window.localStorage;
  private baseUrl = 'http://localhost:3000';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private userHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.cookieService.get("token")}`);



  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    ) { }

  public get(url: string, options?: any): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}`, { headers: this.userHeaders, ...options });
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

  // public boardPOST(url: string, body: any, options?: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}${url}`, body, { headers: this.userHeaders, ...options });
  // }
}
