import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'project-management-app';

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.checkIfTokenExpired();
  }
}
