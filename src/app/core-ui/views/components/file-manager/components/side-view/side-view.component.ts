import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {NodeInterface} from '../../interfaces/node.interface';

@Component({
  selector: 'app-side-view',
  templateUrl: './side-view.component.html',
  styleUrls: ['./side-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideViewComponent implements OnInit {
  @Input() sideViewTemplate: TemplateRef<any>;
  @Input() nodeSubject$: BehaviorSubject<NodeInterface>;
  @Input() allowFolderDownload = false;
  @Output() clickEvent = new EventEmitter();
  
  node: NodeInterface;
  selected$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  ngOnInit() {
    this.nodeSubject$.asObservable().subscribe((node) => {
      this.node = node;
      this.selected$.next(!!node);
    });
  }

  onClick(event: any, type: string) {
    this.clickEvent.emit({type: type, event: event, node: this.node});
  }
}
