import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/main-page/main-page.component';
import { WelcomePageComponent } from './welcome/welcome-page/welcome-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { BoardPageComponent } from './board/board-page/board-page.component';
import { SingupComponent } from './singin/pages/singup/singup.component';
import { LoginComponent } from './singin/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { EditProfileComponent } from './core/pages/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent,canActivate: [AuthGuard] },
  { path: 'welcome', component: WelcomePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SingupComponent, canActivate: [AuthGuard] },
  { path: 'board', component: BoardPageComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundPageComponent, canActivate: [AuthGuard] },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
