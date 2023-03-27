import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Board, Column, Task, Point } from '../core/models/app.model';
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

  getTasksbyColumn(boardId: string, columnId: string): Observable<Task[]>{
    const url = `/boards/${boardId}/columns/${columnId}/tasks`;
    return this.httpService.get(url);
  }

  deleteColumn(boardId: string, columnId: string) {
    const url = `/boards/${boardId}/columns/${columnId}`;
    return this.httpService.delete(url);
  }

  createTask(boardId: string, columnId: string, body: Task) {
    const url = `/boards/${boardId}/columns/${columnId}/tasks`;
    return this.httpService.post(url,body);
  }

  postPoint(body: Point){
    const url = `/points`;
    return this.httpService.post(url,body);
  }

  getPointByTaskId(taskId: string) {
    const url = `/points/${taskId}`;
    return this.httpService.get(url);
  }

  pointCheckChange(pointId: string, body: Point) {
    const url = `/points/${pointId}`;
    return this.httpService.patch(url,body);
  }

  deleteTask(boardId: string, columnId: string, taskId: string){
    const url = `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.httpService.delete(url);
  }

  deletePoint(pointId: string, body: Point){
    const url = `/points/${pointId}`;
    return this.httpService.delete(url);
  }

}
