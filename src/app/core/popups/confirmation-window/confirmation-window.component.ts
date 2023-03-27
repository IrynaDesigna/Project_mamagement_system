import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-window',
  templateUrl: './confirmation-window.component.html',
  styleUrls: ['./confirmation-window.component.sass']
})
export class ConfirmationWindowComponent {
  @Input() deleteConfirm!: string;
  @Input() confirmId!: string;

  @Output() closeConfirmWindow = new EventEmitter<boolean>();
  @Output() actionConfirm = new EventEmitter<string>();

  onCloseConfirmWindow() {
    this.closeConfirmWindow.emit();
  }

  onActionConfirm() {
    this.actionConfirm.emit();
  }

  confirm() {
    this.actionConfirm.emit('confirm');
    this.closeConfirmWindow.emit();
  }

  cancel() {
    this.actionConfirm.emit('cancel');
    this.closeConfirmWindow.emit();
  }
}
