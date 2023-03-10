import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
  title = 'Project Management List';

  ngOnInit(): void {}

  constructor(private router: Router, private renderer: Renderer2) {}

  isActive(route: string) {
    return this.router.url.startsWith(route);
  }

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
