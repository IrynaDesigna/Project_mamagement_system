import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {
  selectedLanguage: string = 'en';
  localStorage = window.localStorage;
  popupText!: string;
  shouldClosePopup = false;
  shouldShowPopup = false;
  loginErr!: string;
  passwordErr!: string;
  userLogin!: string;
  userPassword!: string;

  constructor(
    private languageService: LanguageService,
    private userService: UserService,
    private authService: AuthService,
    private cookieService: CookieService,
    public inputValidationService: InputValidationService,
  ){}

  ngOnInit() {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }

  onPopupClose() {
    this.shouldClosePopup = true;
  }

  onChangeLogin(userLogin: string) {
    userLogin = userLogin.toLocaleLowerCase().trim();



    const userId: string = this.cookieService.get("userId");

    this.userService.getUser(userId).subscribe({
      next: (res) => {
        res.name
        const body = {
          name: res.name,
          login: "",
          password: this.localStorage.getItem('checkingValue') ?? ''
        }

        try {
          this.inputValidationService.loginValidation(userLogin);
          body.login = userLogin;
        }
        catch(e: any) {
          if (this.selectedLanguage === 'en') { this.loginErr = `*${e.message}`; }
          else { this.loginErr = '*Логин может содержать только буквы и цыфры, и должен состоять как минимум из 5ти символов.'};
        }

        if (body.login !== "") {
          this.userService.resetUser(userId, body).subscribe({
            next: (Response) => {
              console.log(Response);

            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              this.popupText = "Your login is updated!";
              this.localStorage.setItem("userLogin", userLogin);
              this.shouldShowPopup = true;
              this.userLogin = '';
            }
          })
        }
      },
      error: (err) => {console.log(err);}
    })
  }

  onUserReset(password: string) {
    const userId: string = this.cookieService.get("userId");
    password = password.trim();

    this.userService.getUser(userId).subscribe({
      next: (res) => {
        const body = {
          name: res.name,
          login: res.login,
          password: ""
        }

        try {
          this.inputValidationService.passwordValidation(password);
          body.password = password;
        }
        catch(e: any) {
          if (this.selectedLanguage === 'en') { this.passwordErr = `*${e.message}`; }
          else { this.passwordErr = '*Пароль должен быть длиной не менее 7 символов и содержать как минимум одну строчную букву, одну заглавную букву, одну цифру и один специальный символ.'};
        }

        if (body.password !== "") {
          this.userService.resetUser(userId, body).subscribe({
            next: (Response) => {},
            error: (error) => { console.log(error); },
            complete: () => {
              this.popupText = "Your password is updated!";
              this.shouldShowPopup = true;
              this.localStorage.setItem("checkingValue", password);
              this.userPassword = '';
            }
          })
        }
      },
      error: (err) => {console.log(err);}
    })
  }

  onUserDelete(event: Event) {
    const userId: string = this.cookieService.get("userId");

    this.userService.getUser(userId).subscribe({
      next: (res) => {
        const body = {
          id: userId,
          name: res.name,
          login: res.login
        }

        this.userService.deleteUser(userId, body).subscribe({
          next: (Response) => { console.log(Response); },
          error: (error) => { console.log(error); },
          complete: () => {
            this.popupText = "Your password is updated!";
            this.shouldShowPopup = true;
            this.authService.logout();
          }
        })
      },
      error: (err) => {console.log(err);}
    })
  }

}
