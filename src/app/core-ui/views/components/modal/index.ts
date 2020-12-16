import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "ecom-modal",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Modal implements OnChanges {
  @Input() className: string;
  @Input() content: Component;
  @Input() isOpen: boolean;
  @Input() loading: boolean;
  @Output() onClose = new EventEmitter();
  private _activeModal;

  constructor(private _modalService: NgbModal) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isOpen && changes.isOpen.currentValue) {
      this.open();
    } else if (this._activeModal && this._modalService.hasOpenModals()) {
      this.handleOnClose();
    }
  }

  open() {
    this._activeModal = this._modalService.open(this.content, {
      ariaLabelledBy: 'ecom-modal',
      size: 'lg',
      windowClass: this.className && this.className || 'custom-show',
    });
    this._activeModal.result.then(
      () => this.handleOnClose(),
      () => this.handleOnClose(),
    );
  }

  handleOnClose() {
    this.onClose.emit();
    this._activeModal.close();
  }
}
