import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { UserService } from 'src/app/services/user.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.sass']
})
export class SingupComponent {
  title = 'PlanIt';
  selectedLanguage: string = 'en';
  url: string = '/auth/signup';

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private renderer: Renderer2,
    private userService: UserService,
    public inputValidationService: InputValidationService,
    ) {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }

  onExploreBtnClick(event: Event, next: HTMLElement) {
    event.preventDefault();
    if (next.style.display === 'none') {
      // Follow link
      const anchor = event.target as HTMLAnchorElement;
      this.router.navigateByUrl(anchor.href);
    } else {
      // Remove link and hide parent element
      const anchor = event.target as HTMLAnchorElement;
      anchor.removeAttribute('href');
      next.style.display = 'none';
    }
  }

  onSubmit(name: string, login: string, password: string, event: Event, next: HTMLElement) {
    event.preventDefault();

    name = name.toLowerCase().trim();
    login = login.toLowerCase().trim();
    password = password.trim();

    this.inputValidationService.nameValidation(name);
    this.inputValidationService.loginValidation(login);
    this.inputValidationService.passwordValidation(password);

    const body = {
      name: name,
      login: login,
      password: password
    };

    this.userService.createUser(body).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        next.style.display = 'flex';
        next.children[0].innerHTML = `Something went wrong. Please, try again`;
        next.children[1].innerHTML = 'Close';
        next.children[1].removeAttribute('href');
        const button = next.children[1];
        this.renderer.listen(button, 'click', (event) => this.onExploreBtnClick(event, next));
      },
      complete: () => {
        console.log('Observable completed');
        next.style.display = 'flex';
      }
    });
  }
}
