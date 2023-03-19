import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  title = 'PlanIt';
  selectedLanguage: string = 'en';
  url: string = '/auth/signin';

  constructor(
    private languageService: LanguageService,
    private httpService: HttpServiceService,
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
        console.log(response);
        this.router.navigate(['/main']);
      },
      error: (error) => {
        console.log(error);
        // handle error here
      },
      complete: () => {
        console.log('Observable completed');
      }
    });
  }
}
