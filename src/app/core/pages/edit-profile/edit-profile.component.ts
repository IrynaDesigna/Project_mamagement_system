import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { User } from '../../models/app.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent {
  localStorage = window.localStorage;
  popupText!: string;


  constructor(
    private userService: UserService,
    public inputValidationService: InputValidationService,
  ){}

  onChangeLogin(userLogin: string) {
    console.log('clicked');
    const name: string = this.localStorage.getItem('userName') ?? '';
    userLogin = userLogin.toLocaleLowerCase().trim();
    this.inputValidationService.loginValidation(userLogin);

    const body = {
      name: name,
      login: userLogin,
      // password: password
    }


  }

  onUserReset(password: string) {
    const name: string = this.localStorage.getItem('userName') ?? '';
    const login: string = this.localStorage.getItem('userLogin') ?? '';
    password = password.trim();
    this.inputValidationService.passwordValidation(password);

    const body = {
      name: name,
      login: login,
      password: password
    }

    this.userService.resetUser(body).subscribe({
      next: (Response) => {
        this.localStorage.setItem('userLogin', name);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.popupText = "Your password is updated!";
        console.log('Observable completed');
      }
    })

  }

}
