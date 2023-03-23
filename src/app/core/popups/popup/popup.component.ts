import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.sass']
})
export class PopupComponent {
  @Input() popupText!: string;
  @Output() closePopup = new EventEmitter<void>();

  onCloseClick() {
    this.closePopup.emit();
  }

}
