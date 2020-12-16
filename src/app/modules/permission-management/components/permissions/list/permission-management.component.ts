import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatPaginator, PageEvent, MatDialog } from "@angular/material";
import { Store, select } from "@ngrx/store";
import { Subscription, fromEvent } from "rxjs";
import { cloneDeep } from 'lodash';
import { tap, skip, distinctUntilChanged, debounceTime, take, map } from "rxjs/operators";


import { environment} from '@env/environment'
import { AppState } from "@app/core-ui/reducers";
import { MessageType } from '@app/core-ui/_base/crud';

import { PermissionModel } from "../../../_models/permission.model";
import { PermissionsDataSource } from "../../../_data-sources/permisisons.datasource";
import { PermissionEditDialogComponent } from '../edit/permission-edit.dialog.component';
import { selectUpdateStatus } from '../../../_selectors/permission.selector';
import {
  LoadPermissionsAction,
  PermissionActionToggleLoading,
  FilterPermissionsAction,
  DetectPermissionTypesAction
} from "../../../_actions/permission.action";
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: "app-permission-management",
  templateUrl: "./permission-management.component.html",
  styleUrls: ["./permission-management.component.scss"]
})
export class PermissionManagementComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;

  public dataSource: PermissionsDataSource;
  private subscriptions: Subscription[] = [];
  public displayedColumns: string[] = [
    "id",
    "name",
    "description",
    "lastModified",
    "modifiedBy",
    "actions"
  ];

  // MatPaginator Inputs
  length = 100;
  pageSize = 100;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _permissionService: PermissionService
    // private layoutUtilsService: LayoutUtilsService
  ) {}

  ngOnInit() {
    // Init paginator
    this.activatedRoute.queryParams.subscribe(
      (params: { page: number; pageSize: number; keyword: string }) => {
        if (params.page) {
          this.paginator.pageIndex = params.page;
        }

        if (params.pageSize) {
          this.paginator.pageSize = params.pageSize;
          this.pageSize = params.pageSize;
        }

        if (params.keyword) {
          this.searchInput.nativeElement.value = params.keyword;
        }
      }
    );

    // Filtration, bind to search
    const searchSubscription = fromEvent(
      this.searchInput.nativeElement,
      "keyup"
    )
      .pipe(
        debounceTime(50),
        distinctUntilChanged(),
        tap((event: any) => {
          this.filterList();
        })
      )
      .subscribe();
    this.subscriptions.push(searchSubscription);

    // Pagination
    const paginatorSubscription = this.paginator.page
      .pipe(
        tap(() => {
          this.loadPermissionsList();
        })
      )
      .subscribe();
    this.subscriptions.push(paginatorSubscription);

    // Init DataSource
    this.dataSource = new PermissionsDataSource(this.store);
    const entityDataSourceSubscription = this.dataSource.entitySubject
      .pipe(
        skip(1), distinctUntilChanged(),
      )
      .subscribe();
    this.subscriptions.push(entityDataSourceSubscription);

    // First Load
    this.loadPermissionsList();
  }

  loadPermissionsList() {
    this.store.dispatch(
      new LoadPermissionsAction({
        companyId: environment.defaultCompanyId
      })
    );
  }

  filterList() {
    const keyword = this.searchInput.nativeElement.value;
    this.store.dispatch(new PermissionActionToggleLoading({ isLoading: true }));
    this.store.dispatch(new FilterPermissionsAction({ keyword }));
  }

  getPaginatorData(event) {
    const keyword = this.searchInput.nativeElement.value;

    this.router.navigate([location.pathname], {
      queryParams: { page: event.pageIndex, pageSize: event.pageSize, keyword }
    });

    return event;
  }

  editPermission(permission: PermissionModel) {
    // Detect permission types
    this.store.dispatch(new DetectPermissionTypesAction({ permission }));

    const _saveMessage = `Permission successfully has been saved.`;
    const _messageType = MessageType.Update;
    const dialogRef = this.dialog.open(PermissionEditDialogComponent, { data: { permission } });
    dialogRef.afterClosed().subscribe(res => {
      // Listening on data changes, check data is changed
      const updateStatusSubscription = this.store.pipe(
        take(1),
        select(selectUpdateStatus)
      ).subscribe((updated: boolean) => {
        if (updated) {
          this.loadPermissionsList();
        }
      });
      this.subscriptions.push(updateStatusSubscription);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
