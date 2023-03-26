import { Component, Output, EventEmitter, Input } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.sass']
})
export class CreateColumnComponent {
  selectedLanguage: string = 'en';
  columnTitle: string = '';
  @Input() errorText!: string;

  @Output() closeClick = new EventEmitter<void>();
  @Output() createClick = new EventEmitter<string>();

  onCreateClick(title: string) {
    this.createClick.emit(title);
  }

  onCloseClick() {
    this.closeClick.emit();
  }

  constructor(
    private languageService: LanguageService,
  ){
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }

}
