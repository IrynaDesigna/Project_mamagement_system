import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('en');
  language$ = this.languageSubject.asObservable();
  language!: string;

  constructor(private cookieService: CookieService) {
    const savedLanguage = this.cookieService.get('language');
    if (savedLanguage) {
      this.language = savedLanguage;
      this.languageSubject.next(savedLanguage);
    } else {
      this.language = 'en';
      this.cookieService.set('language', this.language);
    }
  }

  setLanguage(language: string) {
    this.cookieService.set( 'language', language );
    this.languageSubject.next(language);
  }
}
