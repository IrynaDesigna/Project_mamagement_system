import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  public get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  public post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(url, body, options);
  }
}
