import { Component } from '@angular/core';
import { LanguageService } from './../../services/language.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.sass']
})
export class WelcomePageComponent {
  title = 'PlanIt';
  selectedLanguage: string = 'en';

  constructor(private languageService: LanguageService) {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }
}
