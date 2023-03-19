import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  localStorage = window.localStorage;
  private baseUrl = 'http://localhost:3000';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private getHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });


  constructor(private http: HttpClient) { }

  public get(url: string, options?: any): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}`, { headers: this.getHeaders, ...options });
  }

  public post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${url}`, body, { headers: this.headers, ...options });
  }
}
