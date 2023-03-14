import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingupComponent } from './pages/singup/singup.component';
import { LoginComponent } from './pages/login/login.component';



@NgModule({
  declarations: [
    SingupComponent,
    LoginComponent
  ],
  exports: [
    SingupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SinginModule { }
