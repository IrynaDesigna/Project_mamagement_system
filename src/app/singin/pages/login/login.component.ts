import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  title = 'PlanIt';
  selectedLanguage: string = 'en';

  constructor(private languageService: LanguageService) {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }
}
