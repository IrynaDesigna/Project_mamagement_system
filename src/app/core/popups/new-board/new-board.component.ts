import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Board } from '../../models/app.model';
import { CookieService } from 'ngx-cookie-service';


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

  constructor(
    private languageService: LanguageService,
    private httpService: HttpServiceService,
    private cookieService: CookieService,
  ) {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }

  ngOnInit() {}

  onSubmit(title: string) {
    console.log('ckicked');



    const body: Board = {
      title: title,
      owner: this.userId,
      users: [this.userId]
    }

    this.httpService.post(this.url,body).subscribe({
      next: (res) => {
        console.log(res);

      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        this.boardsTitle = '';
      }
    })
  }

}
