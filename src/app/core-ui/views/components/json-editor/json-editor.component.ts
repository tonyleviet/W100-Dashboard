import {
  Component,
  Input,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { Subject, Subscription } from "rxjs";

@Component({
  selector: "query-json-editor",
  templateUrl: "./json-editor.component.html",
  styleUrls: ["./json-editor.component.scss"]
})
export class JsonEditorComponent implements OnDestroy {
  @ViewChild("jsonEditor", { static: false }) private editorElement;
  @Input() onSubscription: Subject<string>;
  @Input() onCopySubscription: Subject<any>;
  private subscriptions: Subscription[] = [];

  editor: any;

  public options = {
    lineNumbers: true,
    mode: {
      name: "javascript",
      json: true
    },
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    indentWithTabs: true,
    tabSize: 2,
    extraKeys: {
      "Ctrl-Q": function(cm) {
        cm.foldCode(cm.getCursor());
      }
    },
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  };

  ngAfterViewInit() {
    this.editor = this.editorElement.codeMirror;
    
    const contentSubscription = this.onSubscription.subscribe(content => {
      this.editor.setValue(content);
    });

    this.subscriptions.push(contentSubscription);

    const copySubscription = this.onCopySubscription.subscribe(() => {
      this.copyQuery();
    });

    this.subscriptions.push(copySubscription);
  }

  copyQuery() {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = this.editor.getValue();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
