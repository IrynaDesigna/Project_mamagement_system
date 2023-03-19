import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.sass']
})
export class SingupComponent {
  title = 'PlanIt';
  selectedLanguage: string = 'en';
  url: string = '/auth/signup';
  isPasswordValid: boolean = true;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private renderer: Renderer2,
    private userService: UserService,
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

    name = name.toLowerCase();
    login = login.toLowerCase();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    if (!passwordRegex.test(password)) {
      this.isPasswordValid = false;
      throw new Error('Password should contain at least 7 characters, with one or more number and special character');
    } else {
      this.isPasswordValid = true;
    }


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
