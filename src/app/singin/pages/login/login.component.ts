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
  popupText!: string;
  shouldClosePopup = false;
  shouldShowPopup = false;

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router,
    ) {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }

  onPopupClose() {
    this.shouldShowPopup = false;
    this.shouldClosePopup = true;
  }

  onSubmit(login: string, password: string, event: Event) {
    event.preventDefault();

    this.authService.login(login, password).subscribe({
      next: (response) => {
        this.router.navigate(['/main']);
      },
      error: (error) => {

        if (this.selectedLanguage === 'en') {
          this.popupText = `${error.error.message}. The username or password is wrong. Please, try again.`;
        } else {
          this.popupText = `${error.error.message}. Не правильное имя пользователя и пароль. Попробуйте еще раз.`;
        };
        this.shouldShowPopup = true;

      },
      complete: () => {
        console.log('User log in');
      }
    });
  }
}
