import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { BoardsService } from 'src/app/services/boards.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ObjectWithArraysOfStrings, ObjectWithStrings, ObjectWithBoolean, Task } from 'src/app/core/models/app.model';

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
  taskId!: string;
  pointId!: string;
  shouldShowCreateTask = false;
  shouldShowEditTask = false;
  shouldDeleteConfirm = false;
  shouldClosePopup = false;
  shouldShowPopup = false;
  shouldShowCreateColumn = false;
  shouldShowEditColumn = false;
  columnTitles: string[] = [];
  columnIds: string[] = [];
  taskTitles: ObjectWithArraysOfStrings = {};
  taskIds: ObjectWithArraysOfStrings = {};
  pointIds: ObjectWithStrings = {};
  taskStatus: ObjectWithBoolean = {};
  confirmId!: string;
  confirmAction: string = '';

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private router: Router,
    public inputValidationService: InputValidationService,
    private cookieService: CookieService,
    private renderer: Renderer2,
    private el: ElementRef
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
    this.confirmAction = '';
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
          this.popupText = '';
          this.shouldShowCreateColumn = false;
        }
      });
    }
  }

  onDeleteBoard(event: Event) {
    this.confirmAction = 'deleteBoard';
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
    this.confirmAction = 'deleteColumn';
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
        const pointBody = {
          title: title,
          taskId: task._id,
          boardId: this.boardId,
          done: false
        }

        this.boardsService.postPoint(pointBody).subscribe({
          error: (err) => {console.log(err);}
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
                  if (points[0] !== undefined ) {
                    this.taskStatus[taskId] = points[0].done;
                    this.pointIds[taskId] = points[0]._id;
                  }
                }, error: (err) => { console.log(err); }
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
    this.boardsService.pointCheckChange(pointId,pointBody).subscribe({});
  }

  onTaskDragStart(event: DragEvent) { }

  onTaskDragEnd(event: DragEvent) {
    const taskId = (event.target as HTMLElement).id;
    const columnId = (event.target as HTMLElement).closest('.column')?.id ?? '';
    const pointId = (event.target as HTMLElement).closest('[type="checkbox"')?.id ?? '';

    const taskTitle: string = (event.target as HTMLElement).getAttribute('data-task-title') ?? '';
    const x = event.clientX;
    const y = event.clientY;
    let element = document.elementFromPoint(x, y);

    while (element != null) {
      if (element.classList.contains("column")) {
        const el = element;
        break;
      }
      element = element.parentElement;
    }
    this.columnId = element?.id ?? '';
    this.updateTask(columnId, taskId);
  }

  onColumnEdit(columnId: string){
    this.columnId = columnId;
    // this.taskId = taskId;
    this.shouldShowEditColumn = true
  }

  columnEdit(title: string){
    const body = {
      title: title,
      order: 0
    }
    this.boardsService.columnPut(this.boardId,this.columnId,body).subscribe({});
    this.shouldShowEditColumn = false;
    this.boardLoading();
  }

  onConfirm(action: string) {
    if (this.confirmAction === 'deleteBoard') {
      if (action === 'confirm') {
        this.onDeleteBoardConfirm();
      }
    } else if (this.confirmAction === 'deleteColumn') {
      if (action === 'confirm') {
        this.onDeleteColumnConfirm();
      }
    } else if (this.confirmAction === 'deleteTask') {
      if (action === 'confirm') {
        this.onDeleteTaskConfirm();
      }
    }
  }

  onTaskEdit(columnId: string, taskId: string){
    this.columnId = columnId;
    this.taskId = taskId;
    this.shouldShowEditTask = true
  }

  taskEdit(title: string) {
    let body = {
      title: title,
      order: 0,
      description: "description",
      columnId: this.columnId,
      userId: this.userId,
      users: [this.userId]
    };
    this.boardsService.taskPut(this.boardId,this.columnId,this.taskId,body).subscribe({});
    this.shouldShowEditTask = false;
    this.boardLoading();
  }

  updateTask(columnId: string, taskId: string) {
    let body = {
        title: "",
        order: 0,
        description: "description",
        columnId: this.columnId,
        userId: this.userId,
        users: [this.userId]
    };

    this.boardsService.getTaskById(this.boardId,columnId,taskId).subscribe({
      next: (task) => {
        body.order = task.order;
        body.title = task.title;
      },
      complete: () => {
        this.boardsService.taskPut(this.boardId,columnId,taskId,body).subscribe({});
        this.boardLoading();
      }
    })
  }

  deleteTask(columnId: string, taskId: string, pointId: string, title: string) {
    this.columnId = columnId;
    this.taskId = taskId;
    this.pointId = pointId;
    this.confirmAction = 'deleteTask';

    if (this.selectedLanguage === 'en') {
      this.popupText = `Do you want to delete ${title} from the column?`;
    } else {
      this.popupText = `Вы хотите удалить ${title} из списка?`;
    };
    this.shouldDeleteConfirm = true;
  }

  onDeleteTaskConfirm() {
    this.shouldDeleteConfirm = false;

    this.boardsService.deleteTask(this.boardId,this.columnId,this.taskId).subscribe({
      complete: () => {
        this.boardLoading();
      }
    })

    this.boardsService.deletePoint(this.pointId);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}
