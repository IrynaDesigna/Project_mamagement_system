import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { BoardsService } from 'src/app/services/boards.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ObjectWithArraysOfStrings, ObjectWithStrings, ObjectWithBoolean } from 'src/app/core/models/app.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  selectedLanguage: string = 'en';
  userId: string = this.cookieService.get('userId').split('=')[0].split(',')[0];
  boardId: string = this.route.snapshot.paramMap.get('id') ?? '';
  boardLength: number = 0;
  taskLength: number = 0;
  boardData: any;
  popupText!: string;
  columnId!: string;
  shouldShowCreateTask = false;
  shouldDeleteConfirm = false;
  shouldClosePopup = false;
  shouldShowPopup = false;
  shouldShowCreateColumn = false;
  columnTitles: string[] = [];
  columnIds: string[] = [];
  taskTitles: ObjectWithArraysOfStrings = {};
  taskIds: ObjectWithArraysOfStrings = {};
  pointId: ObjectWithStrings = {};
  taskStatus: ObjectWithBoolean = {};

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private router: Router,
    public inputValidationService: InputValidationService,
    private cookieService: CookieService
    ) {
      this.languageService.language$.subscribe((language) => {
        this.selectedLanguage = language;
      });
    }

  ngOnInit(): void {
    this.boardLoading();
  }

  boardLoading() {
    this.boardsService.getBoard(this.boardId).subscribe({
      next: (res) => {
        this.boardData = res;
        this.boardLength = this.boardData.length;
        const columns = res.map(column => ({id: column._id, title: column.title, order: column.order}));
        this.columnTitles = columns.map(column => column.title);
        this.columnIds = columns.map(column => column.id || '');

        columns.forEach(column => {
          if (column.id !== undefined ) {
            this.colunmBuilder(column.id);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }

    });
  }

  onPopupClose() {
    this.shouldShowPopup = false;
    this.shouldClosePopup = true;
    this.router.navigate(['/main']);
  }

  onCloseConfirmWindow() {
    this.shouldDeleteConfirm = false;
  }

  onCloseClick() { this.shouldShowCreateColumn = false; }

  onCreateClick(title: string) {
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
          this.boardLoading();
          this.shouldShowCreateColumn = false;
        }
      });
    }
  }

  onDeleteBoard(event: Event) {
    if (this.selectedLanguage === 'en') {
      this.popupText = `Do you want to delete current board?`;
    } else {
      this.popupText = `Вы действительно хотите удалить текущий план?`;
    };
    this.shouldDeleteConfirm = true;
  }

  onDeleteBoardConfirm() {
    this.shouldDeleteConfirm = false;
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

  onColumnDelete(columnId: string, title: string) {
    this.columnId = columnId;
    if (this.selectedLanguage === 'en') {
      this.popupText = `Do you want to delete ${title}?`;
    } else {
      this.popupText = `Вы действительно хотите удалить ${title}?`;
    };
    this.shouldDeleteConfirm = true;
  }

  onDeleteColumnConfirm() {
    this.shouldDeleteConfirm = false;
    this.boardsService.deleteColumn(this.boardId,this.columnId).subscribe({
      next: (res) => {
        console.log(res);
        this.boardLoading();
      },
      error: (err) => { console.log(err); },
      complete: () => {
        this.columnId = '';
      }
    })
  }

  onCreateTaskClick(title: string) {
    this.shouldShowCreateTask = false;

    this.boardsService.getTasksbyColumn(this.boardId,this.columnId).subscribe({
      next: (res) => { this.taskLength = res.length; },
      error: (err) => {console.log(err);}
    });

    const taskBody = {
      title: title,
      order: this.boardLength + 1,
      description: title,
      userId: this.userId,
      users: [this.userId]
    };

    this.boardsService.createTask(this.boardId, this.columnId, taskBody).subscribe({
      next: (task) => {
        console.log(task);
        const pointBody = {
          title: title,
          taskId: task._id,
          boardId: this.boardId,
          done: false
        }

        this.boardsService.postPoint(pointBody).subscribe({
          next: (point) => {
            console.log(point);
          },
          error: (err) => {
            console.log(err);

          }
        })

       },
      error: (err) => { console.log(err);}
    })





    this.boardLoading();
  }

  colunmBuilder(columnId: string) {
    this.boardsService.getTasksbyColumn(this.boardId,columnId).subscribe({
      next: (res) => {
        const tasks = res.map(task => ({id: task._id, title: task.title}));

        if (columnId !== undefined) {
          this.taskTitles[columnId] = tasks.map(task => task.title);
          this.taskIds[columnId] = tasks.map(task => task.id || '');

          tasks.map(task => {
            if (typeof task.id === 'string') {
              const taskId = task.id;
              this.boardsService.getPointByTaskId(task.id).subscribe({
                next: (points) => {
                  this.taskStatus[taskId] = points[0].done;
                  this.pointId[taskId] = points[0]._id;;
                },
                error: (err) => {
                  console.log(err);
                }
              });
            }
          })
        }
      },
      error: (err) => {console.log(err);}
    });
  }

  onCloseTaskCreator() {
    this.shouldShowCreateTask = false;

  }

  onTaskCreate(columnId: string) {
    this.columnId = columnId;
    this.shouldShowCreateTask = true;
  }

  onCheckboxChange(title: string, pointId: string, taskStatus: boolean, event: Event) {
    const pointBody = {
      title: title,
      done: !taskStatus
    }
    this.boardsService.pointCheckChange(pointId,pointBody).subscribe({
      next: (res) => {console.log(res); },
      error: (err) => {console.log(err); }
    })

  }
}
