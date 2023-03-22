import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { UserService } from 'src/app/services/user.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { User } from 'src/app/core/models/app.model';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.sass']
})
export class SingupComponent {
  title = 'PlanIt';
  popupText!: string;
  shouldClosePopup = false;
  shouldShowPopup = false;
  nameErr!: string;
  loginErr!: string;
  passwordErr!: string;
  link!: string;

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

  onPopupClose() {
    this.shouldShowPopup = false;
    this.shouldClosePopup = true;
    if (this.link) {
      this.router.navigate([this.link]);
    }
  }

  onSubmit(name: string, login: string, password: string, event: Event) {
    event.preventDefault();

    name = name.toLowerCase().trim();
    login = login.toLowerCase().trim();
    password = password.trim();

    let body: User = {
      name: "",
      login: ""
    };

    try {
      this.inputValidationService.nameValidation(name);
      body.name = name;
    }
    catch(e: any) {
        if (this.selectedLanguage === 'en') { this.nameErr = `*${e.message}`; }
        else { this.nameErr = '*Имя должно содержать только буквы и должно состоять как минимум из 4х букв..'};
    }

    try {
      this.inputValidationService.loginValidation(login);
      body.login = login;
    }
    catch(e: any) {
        if (this.selectedLanguage === 'en') { this.loginErr = `*${e.message}`; }
        else { this.loginErr = '*Логин может содержать только буквы и цыфры, и должен состоять как минимум из 6ти символов.'};
    }

    try {
      this.inputValidationService.passwordValidation(password);
      body.password = password;
    }
    catch(e: any) {
        if (this.selectedLanguage === 'en') { this.passwordErr = `*${e.message}`; }
        else { this.passwordErr = '*Логин может содержать только буквы и цыфры, и должен состоять как минимум из 6ти символов.'};
    }



    if ( body.name !== "" && body.login !== "" && body.password ) {
      this.userService.createUser(body).subscribe({
          next: (response) => {},
          error: (error) => {
            this.popupText = error.error.message;
            this.shouldShowPopup = true;
          },
          complete: () => {
            if (this.selectedLanguage === 'en') { this.popupText = `Welcome to ${this.title}` }
            else { this.popupText = `Добро пожаловать в ${this.title}` };
            this.link = '/login';
            this.shouldShowPopup = true;
          }
        });
    }
  }
}
