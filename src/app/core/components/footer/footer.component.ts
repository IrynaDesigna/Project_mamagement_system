import { Component } from '@angular/core';
import { LanguageService } from './../../../services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  selectedLanguage: string = 'en';

  constructor(private languageService: LanguageService) {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }
}
