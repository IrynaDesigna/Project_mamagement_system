import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.sass']
})
export class TaskCreatorComponent {
  selectedLanguage: string = 'en';
  taskTitle: string = '';
  @Input() errorText!: string;
  @Output() closeTaskCreator = new EventEmitter<void>();
  @Output() createTaskClick = new EventEmitter<string>();

  constructor(private languageService: LanguageService,) {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }



  onCreateTaskClick(title: string) {
    this.createTaskClick.emit(title);
  }

  onCloseTaskCreator() {
    this.closeTaskCreator.emit();
  }


}
