import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaginatorModel } from '@app/core-ui/_base/crud/models/_base.model';

@Component({
  selector: 'core-ui-paginator',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class CoreUIPaginator {
  @Input() paginator: PaginatorModel;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @Input() loading: boolean;
  @Output() onChange = new EventEmitter();

  onChangePage(page) {
    const data = new PaginatorModel({
      pageSize: page.pageSize,
      pageIndex: (page.pageIndex + 1),
    })
    this.onChange.emit(data);
  }
}
