import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingupComponent } from './pages/singup/singup.component';
import { LoginComponent } from './pages/login/login.component';
import { CoreModule } from '../core/core.module';



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
    CommonModule,
    CoreModule
  ]
})
export class SinginModule { }
