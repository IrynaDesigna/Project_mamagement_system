import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  title = 'PlanIt';
  selectedLanguage: string = 'en';
  url: string = '/auth/signin';
  localStorage = window.localStorage;

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router,
    ) {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }

  onSubmit(login: string, password: string, event: Event) {
    event.preventDefault();

    this.authService.login(login, password).subscribe({
      next: (response) => {
        this.router.navigate(['/main']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Observable completed');
      }
    });
  }
}
