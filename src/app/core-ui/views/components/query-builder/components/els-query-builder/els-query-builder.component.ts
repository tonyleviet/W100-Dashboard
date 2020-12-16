import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { isObject, has } from 'lodash';
import { AdminConfig } from '@core/index';
import { delay } from "rxjs/operators";
import { of, Subject, Subscription } from "rxjs";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  QueryBuilderConfig,
  DataConfig
} from "../query-builder/query-builder.interfaces";
import {
  parseQueryToConditions,
  getESBool,
  getConfigFromMapping,
  getOperator
} from "../../query-builder.helper";
import { MatDialog } from "@angular/material";
import { QueryEditorModalComponent } from "../query-editor-modal/query-editor-modal.component";


@Component({
  selector: "els-query-builder",
  templateUrl: "./els-query-builder.component.html",
  styleUrls: ["./els-query-builder.component.scss"]
})
export class ElsQueryBuilderComponent implements OnInit, OnDestroy {
  @Input() data: DataConfig;
  @Input() properties: any;
  @Output() onChangeEvent = new EventEmitter();

  public queryCtrl: FormControl;
  public builderConfig: QueryBuilderConfig;
  public queryConfig: any = {
    query: {}
  };
  public queryResult = "";
  public getOperator = getOperator;
  public adminConfig = AdminConfig;

  public isRangeOfDay: boolean;
  // Json Editor
  public options = {
    theme: "material",
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
      "Ctrl-Q": function (cm) {
        cm.foldCode(cm.getCursor());
      }
    },
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  };

  private unsubscribes: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.isRangeOfDay = false;
  }

  changeDisabled(event: Event) {
    (<HTMLInputElement>event.target).checked
      ? this.queryCtrl.disable()
      : this.queryCtrl.enable();
  }

  ngOnInit() {
    this.queryConfig = this.data.config;
    this.queryCtrl = this.formBuilder.control(this.queryConfig);
    this.builderConfig = this.data.query;

    this.getMapping();
  }

  onQueryChange(result) {
    of(undefined)
      .pipe(delay(100))
      .subscribe(() => {
        const result = {
          query: getESBool(this.queryConfig, this.builderConfig)
        };
        const resultStr = JSON.stringify(result, null, 2);
        this.queryResult = resultStr;

        const tempOperator = this.queryConfig.rules.map(x => x.rules);

        if (tempOperator[0]) {
          const tempRangeOfDay = tempOperator[0].map(x => x.operator)

          if (tempRangeOfDay.find(x => x === 'in_range_of_days')) {
            this.isRangeOfDay = true;
          }
          else {
            this.isRangeOfDay = false;
          }
        }

        this.onChangeEvent.emit({
          query: result,
          config: this.queryConfig
        });
      });
  }

  getMapping() {
    this.builderConfig = getConfigFromMapping(
      this.properties
    );
  }

  openQueryEditorModal() {
    this.dialog.open(QueryEditorModalComponent, { data: this.queryResult });
  }

  checkHasProperty(obj, propName) {
    if (!isObject(obj)) {
      return false;
    }

    return has(obj, propName);
  }

  ngOnDestroy() {
    this.unsubscribes.forEach(s => s.unsubscribe());
  }
}
