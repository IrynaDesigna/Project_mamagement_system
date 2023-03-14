import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/main-page/main-page.component';
import { WelcomePageComponent } from './welcome/welcome-page/welcome-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { BoardPageComponent } from './board/board-page/board-page.component';
import { SingupComponent } from './singin/pages/singup/singup.component';
import { LoginComponent } from './singin/pages/login/login.component';

const routes: Routes = [
  // { path: '', redirectTo: 'todos', pathMatch: 'full' },
  // { path: 'todos', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule) },

  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingupComponent },
  { path: 'board', component: BoardPageComponent },
  { path: '**', component: NotFoundPageComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
