import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardPageComponent } from './board-page/board-page.component';

@NgModule({
  declarations: [
    BoardPageComponent
  ],
  exports: [
    BoardPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BoardModuleModule { }
