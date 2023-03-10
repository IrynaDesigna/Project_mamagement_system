import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  availableLanguages = ['en', 'ua'];
  currentLanguage = new BehaviorSubject<string>('en');

  constructor() { }

  setCurrentLanguage(lang: string) {
    this.currentLanguage.next(lang);
  }
}
