import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Board, Column } from '../core/models/app.model';
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

  getBoard(boardId: string): Observable<Column[]>{
    const url = `/boards/${boardId}/columns`;
    return this.httpService.get(url,boardId);
  }

  deleteBoard(boardId: string): Observable<Board>{
    const url = `/boards/${boardId}`;
    return this.httpService.delete(url,boardId);
  }

  createColunm(boardId: string, body: {}){
    const url = `/boards/${boardId}/columns`;
    return this.httpService.post(url,body);
  }

  deleteColumn(boardId: string, columnId: string) {
    const url = `/boards/${boardId}/columns/${columnId}`;
    return this.httpService.delete(url);
  }

}
