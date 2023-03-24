import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from './../../../services/language.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/app.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
  title = 'Project Management List';
  user = 'Iryna'
  isChecked: boolean = false;
  selectedLanguage: string = 'en';
  public authService: AuthService;
  public currentUser!: User;
  isLoggedIn!: boolean;
  localStorage = window.localStorage;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    authService: AuthService
    ) {
      this.authService = authService;
    }

  ngOnInit(): void {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });

    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn; // Update the isLoggedIn flag
    });

    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.user = user.login;
    });
  }

  onNewBoardCreate(e: Event){
    e.preventDefault();
    this.router.navigate(['/create-new-board']);
  }

  onLogoutClick() {
    this.authService.setIsLoggedIn(false);
    this.router.navigate(['/welcome']);
  }

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.setLanguage(target.value);
  }

  setLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }

  logout() {
    this.authService.logout();
  }

  // header scrolling
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any){
    const el = document.getElementById('header');
    if (window.pageYOffset > 56) {
      if (el) {
        el.classList.add('scroll');
      }
    } else if (window.pageYOffset === 0) {
      if (el) {
        el.classList.remove('scroll');
      }
    }
  }
}
