import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, Input} from '@angular/core';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {
  @ViewChild('uploadFolder', {static: false}) uploadFolder: ElementRef;
  @Output() buttonClicked = new EventEmitter();
  @Output() buttonClose = new EventEmitter();

  inputValue = '';

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    const el: HTMLElement = (this.uploadFolder.nativeElement as HTMLElement);
    // @ts-ignore
    this.buttonClicked.emit(el.value);
  }

  onClose() {
    this.buttonClose.emit();
  }

  onInputChange(event: any) {
    this.inputValue = event.target.value;
  }
}
