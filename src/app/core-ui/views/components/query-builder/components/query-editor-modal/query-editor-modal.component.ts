import { Component, OnInit, Inject } from "@angular/core";
import { Subject } from "rxjs";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-query-editor-modal",
  templateUrl: "./query-editor-modal.component.html"
})
export class QueryEditorModalComponent implements OnInit {
  public jsonEditorSubject = new Subject<string>();
  public copySubject = new Subject<any>();
  copyTextBtn: string = 'Copy query';

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  copyQuery() {
    this.copyTextBtn = 'Copied!';
    this.copySubject.next();

    const self = this;

    setTimeout(() => {
      self.copyTextBtn = 'Copy query';
    }, 500);    
  }

  ngOnInit() {
    const self = this;

    setTimeout(() => {
      self.jsonEditorSubject.next(self.data);
    }, 200);
  }
}
