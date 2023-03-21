import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent {
  localStorage = window.localStorage;
  popupText!: string;
  shouldClosePopup = false;
  shouldShowPopup = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private cookieService: CookieService,
    public inputValidationService: InputValidationService,
  ){}

  onPopupClose() {
    this.shouldClosePopup = true;
  }

  onChangeLogin(userLogin: string) {
    userLogin = userLogin.toLocaleLowerCase().trim();
    this.inputValidationService.loginValidation(userLogin);

    const userId: string = this.cookieService.get("userId");

    this.userService.getUser(userId).subscribe({
      next: (res) => {
        res.name
        const body = {
          name: res.name,
          login: userLogin,
          password: this.localStorage.getItem('checkingValue') ?? ''
        }
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
          }
        })
      },
      error: (err) => {console.log(err);}
    })
  }

  onUserReset(password: string) {
    const userId: string = this.cookieService.get("userId");
    password = password.trim();
    this.inputValidationService.passwordValidation(password);

    this.userService.getUser(userId).subscribe({
      next: (res) => {
        const body = {
          name: res.name,
          login: res.login,
          password: password
        }

        this.userService.resetUser(userId, body).subscribe({
          next: (Response) => { console.log(Response); },
          error: (error) => { console.log(error); },
          complete: () => {
            this.popupText = "Your password is updated!";
            this.shouldShowPopup = true;
            this.localStorage.setItem("checkingValue", password);
          }
        })
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
