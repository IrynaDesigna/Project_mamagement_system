import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-window',
  templateUrl: './confirmation-window.component.html',
  styleUrls: ['./confirmation-window.component.sass']
})
export class ConfirmationWindowComponent {
  @Input() ConfirmWindowText!: string;
  @Output() closeConfirmWindow = new EventEmitter<void>();

  onCloseConfirmWindow() {
    this.closeConfirmWindow.emit();
  }
}
