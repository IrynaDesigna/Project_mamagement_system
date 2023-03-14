import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.sass']
})
export class SingupComponent {
  title = 'PlanIt';
  selectedLanguage: string = 'en';

  constructor(private languageService: LanguageService) {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }
}
