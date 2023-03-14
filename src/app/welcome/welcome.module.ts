import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';


@NgModule({
  declarations: [
    WelcomePageComponent
  ],
  exports: [
    WelcomePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WelcomeModule { }
