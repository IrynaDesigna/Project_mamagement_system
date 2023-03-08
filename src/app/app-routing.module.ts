import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/main-page/main-page.component';
import { WelcomePageComponent } from './welcome/welcome-page/welcome-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { LoginPageComponent } from './login/pages/login-page/login-page.component';
import { SignupPageComponent } from './login/pages/signup-page/signup-page.component';
import { BoardPageComponent } from './board/board-page/board-page.component';

const routes: Routes = [
  // { path: '', redirectTo: 'todos', pathMatch: 'full' },
  // { path: 'todos', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule) },

  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'board', component: BoardPageComponent },
  { path: '**', component: NotFoundPageComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
