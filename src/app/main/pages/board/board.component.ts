import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { BoardsService } from 'src/app/services/boards.service';
import { Router } from '@angular/router';
import { Column } from 'src/app/core/models/app.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  selectedLanguage: string = 'en';
  boardId: string = this.route.snapshot.paramMap.get('id') ?? '';
  boardLength: number = 0;
  boardData: any;
  popupText!: string;
  shouldClosePopup = false;
  shouldShowPopup = false;
  shouldShowCreateColumn = false;
  columnTitles: string[] = [];
  columnIds: string[] = [];
  columnOrders: number[] = [];
  taskTitles: string[] = [];

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private router: Router,
    public inputValidationService: InputValidationService,
    ) {
      this.languageService.language$.subscribe((language) => {
        this.selectedLanguage = language;
      });
    }

  ngOnInit(): void {
    this.boardLoding();
  }

  boardLoding() {
    this.boardsService.getBoard(this.boardId).subscribe({
      next: (res) => {
        this.boardData = res;
        this.boardLength = this.boardData.length;
        console.log(res);

        const columns = res.map(column => ({id: column._id, title: column.title, order: column.order}));
        console.log(columns);

        this.columnTitles = columns.map(column => column.title);
        this.columnIds = columns.map(column => column.id || '');

      },
      error: (err) => {
        console.log(err);
      }

    });
  }

  onPopupClose() {
    this.shouldShowPopup = false;
    this.shouldClosePopup = true;
  }

  onCloseClick() { this.shouldShowCreateColumn = false; }

  onCreateClick(title: string) {
    console.log(title);

    const body = {
      title: '',
      order: (this.boardLength + 1).toString()
    }

    try {
      this.inputValidationService.titleValidation(title);
      body.title = title;
    }
    catch(err: any) {
      if (this.selectedLanguage === 'en') { this.popupText = `*${err.message}`; }
      else { this.popupText = '*Заголовок может содержать только символы латинского или кириллического алфавита и цифры. Длина заголовка должна составлять от 7 до 100 символов. Заголовок не должен начинаться или заканчиваться пробелом.'};
    }

    if (body.title !== '') {
      this.boardsService.createColunm(this.boardId,body).subscribe({
        next: (res) => { },
        error: (err) => { console.log(err); },
        complete: () => {
          this.boardLoding();
          this.shouldShowCreateColumn = false;
        }
      });
    }
  }

  onDeleteBoard(event: Event) {
    this.boardsService.deleteBoard(this.boardId).subscribe({
      next: (res) => {
        if (this.selectedLanguage === 'en') {
          this.popupText = `The board wes deleted!`;
        } else {
          this.popupText = `Текущий план удален!`;
        };
        this.shouldShowPopup = true;
      },
      error: (err) => {console.log(err);}
    });
  }

  onColumnCreate(event: Event){ this.shouldShowCreateColumn = true; }

  onColumnDelete(columnId: string) {
    console.log(this.boardId,columnId);

    this.boardsService.deleteColumn(this.boardId,columnId).subscribe({
      next: (res) => {
        console.log(res);
        this.boardLoding();
      },
      error: (err) => { console.log(err); }
    })

  }
}
