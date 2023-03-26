import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Board } from 'src/app/core/models/app.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {
  private userId!: string;
  boardTitles: string[] = [];
  boardIds: string[] = [];
  boardLinks: string[] = [];


  constructor(
    private boardsService: BoardsService,
    private cookieService: CookieService,
    private httpService: HttpServiceService
    ) {}

  ngOnInit() {
    this.userId = this.cookieService.get('userId')
    this.getBoards(this.userId);
  }

  getBoards(userId: string) {
    this.boardsService.getAllboards(userId).subscribe({
      next: (res) => {
        console.log(res);
        const boards = res.map(board => ({ title: board.title, id: board._id }));

        this.boardTitles = boards.map(board => board.title);
        this.boardIds = boards.map(board => board.id || '');
        this.boardLinks = boards.map(board => `/boards/${board.id}/columns`);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}


