import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.sass']
})
export class NotFoundPageComponent {
  selectedLanguage: string = 'en';

  constructor(
    private languageService: LanguageService,
  ){
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }

}
