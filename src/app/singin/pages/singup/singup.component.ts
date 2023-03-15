import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../../../services/language.service';
import { User } from 'src/app/core/models/app.model';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.sass']
})
export class SingupComponent {
  title = 'PlanIt';
  selectedLanguage: string = 'en';

  constructor(private languageService: LanguageService, private http: HttpClient) {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }


  // @Output() createUser = new EventEmitter<User>();

  createUser(name: string, login: string, password: string) {
    const url = 'http://localhost:3000/auth/signup';

    const body = {
      name: name,
      login: login,
      password: password
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.post(url, body, { headers });
  }

  onSubmit(name: string, login: string, password: string, event: Event) {
    event.preventDefault();
    this.createUser(name, login, password).subscribe({
      next: (response) => {
        console.log(response);
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
