import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    SignupPageComponent
  ],
  exports: [
    LoginPageComponent,
    SignupPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModuleModule { }
