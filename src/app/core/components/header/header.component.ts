import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from './../../../services/language.service';


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

  constructor(
    private router: Router,
    private languageService: LanguageService
    ) {}



  isActive(route: string) {
    return this.router.url.startsWith(route);
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.setLanguage(target.value);
  }

  setLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }

  // header scrolling
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any){
    const el = document.getElementById('header');
    if (window.pageYOffset > 56) {
      console.log(window.pageYOffset > 56);

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
