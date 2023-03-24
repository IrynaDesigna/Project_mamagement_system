import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Board } from '../core/models/app.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private httpService: HttpServiceService,) {}

  getAllboards(userId: string): Observable<Board[]> {
    const url = `/boards`;
    return this.httpService.get(url,userId);
  }
}
