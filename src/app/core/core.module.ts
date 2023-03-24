import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { FormsModule } from '@angular/forms';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { PopupComponent } from './popups/popup/popup.component';
import { ConfirmationWindowComponent } from './popups/confirmation-window/confirmation-window.component';
import { NewBoardComponent } from './popups/new-board/new-board.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    EditProfileComponent,
    PopupComponent,
    ConfirmationWindowComponent,
    NewBoardComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PopupComponent,
    ConfirmationWindowComponent,
    NewBoardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
