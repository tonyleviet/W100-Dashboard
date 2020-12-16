// Angular
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'kt-confirm-dialog',
  templateUrl: './index.html',
  styleUrls: ['./index.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmDialog {
  constructor(
		public dialogRef: MatDialogRef<ConfirmDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any) {}

	onCancel(): void {
		this.dialogRef.close(false);
	}

	onConfirm() {
    this.dialogRef.close(true);
	}
}
