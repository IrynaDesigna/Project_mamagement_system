import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {
  isPasswordValid: boolean = true;
  isNameValid: boolean = true;
  isLoginValid: boolean = true;
  isTitleValid: boolean = true;

  constructor() { }

  nameValidation(name: string) {
    const nameRegex = /^[a-zа-я]{4,}$/i;
    if (!nameRegex.test(name)) {
      this.isNameValid = false;
      throw new Error('The name must consist of only letters and must be at least 4 characters long.');
    } else {
      this.isNameValid = true;
    }
  }

  loginValidation(login: string) {
    const loginRegex = /^[a-zа-я0-9]{5,}$/i;
    if (!loginRegex.test(login)) {
      this.isLoginValid = false;
      throw new Error('Login must consist of only letterts and numbers and must be at least 5 characters long.');
    } else {
      this.isLoginValid = true;
    }
  }

  passwordValidation(password: string) {
    const passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-zА-Яа-я\d@$#!%*?&]{7,}$/;
    if (!passwordRegex.test(password)) {
      this.isPasswordValid = false;
      throw new Error('The password must be at least 7 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.');
    } else {
      this.isPasswordValid = true;
    }
  }

  titleValidation(title: string) {
    const titleRegex = /^(?=\S)(?=.*[A-Za-zА-Яа-я0-9])[A-Za-zА-Яа-я0-9 ]{7,100}(?<=\S)$/
    if (!titleRegex.test(title)) {
      this.isTitleValid = false;
      throw new Error('The title may only contain characters from the Latin or Cyrillic alphabet, as well as numbers. The title must be between 7 and 100 characters long. The title must not begin or end with a space.');
    } else {
      this.isTitleValid = true;
    }
  }
}
