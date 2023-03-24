import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { BoardComponent } from './pages/board/board.component';


@NgModule({
  declarations: [
    MainPageComponent,
    BoardComponent
  ],
  exports: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class MainModule { }
