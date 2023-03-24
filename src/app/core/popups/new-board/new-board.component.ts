import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Board } from '../../models/app.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.sass']
})
export class NewBoardComponent implements OnInit {
  selectedLanguage: string = 'en';
  url: string = '/boards';
  boardsTitle!: string;
  private userId: string = this.cookieService.get('userId');
  popupText!: string;
  shouldShowPopup = false;
  shouldClosePopup = false;

  constructor(
    private languageService: LanguageService,
    private httpService: HttpServiceService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }

  ngOnInit() {}

  onPopupClose() {
    this.shouldShowPopup = false;
    this.shouldClosePopup = true;
    this.router.navigate(['/main']);
  }

  onSubmit(title: string) {
     const body: Board = {
      title: title,
      owner: this.userId,
      users: [this.userId]
    }

    this.httpService.post(this.url,body).subscribe({
      next: (res) => {
        console.log(res);
        if (this.selectedLanguage === 'en') {
          this.popupText = `The board: ${res.title}, was craeted!`;
        } else {
          this.popupText = `План: ${res.title}, создан!`;
        };
        this.shouldShowPopup = true;
      },
      error: (err) => {
        if (this.selectedLanguage === 'en') {
          this.popupText = `Something went wrong. Please, try again.`;
        } else {
          this.popupText = `Что-то пошло не так. Пожалуйста, попробуйте еще раз.`;
        };
        this.shouldShowPopup = true;

      },
      complete: () => {
        this.boardsTitle = '';
      }
    })
  }

}
