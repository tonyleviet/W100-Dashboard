import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material";
import { PageEvent } from "@angular/material/paginator";
import { Store, select } from "@ngrx/store";
import { Subscription, fromEvent, of } from "rxjs";
import { AppState } from "@core-ui/reducers";
import { QueryParamsModel } from "@core-ui/_base/crud";
import {
  LoadUsersAction,
  UserAllTotalAction,
  UserActiveTotalAction,
  UserInActiveTotalAction,
  UserLockedTotalAction
} from "../../../_actions/user.actions";
import { UsersDataSource } from "../../../_data-sources/users.datasource";
import {
  distinctUntilChanged,
  skip,
  debounceTime,
  tap,
} from "rxjs/operators";
import "lodash/isEmpty";
import {
  MatDialog,
} from "@angular/material/dialog";

import { UserCreateDialogComponent } from "../../user/user-create-dialog/user-create-dialog.component";
import { UserService } from '@app/modules/user-management/services';
import { getUserTotalStatus } from '@app/modules/user-management/_selectors/user.selectors';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;

  public dataSource: UsersDataSource;
  private subscriptions: Subscription[] = [];
  public displayedColumns: string[] = [
    "id",
    "userName",
    "fullName",
    "role",
    "status",
    "isLockedOut",
    "lastLoginDate",
    "actions"
  ];
  sortStatuses: { key: string; name: string, count: number }[] = [
    { key: "all", name: "All", count: 0 },
    { key: "active", name: "Active", count: 0 },
    { key: "inactive", name: "Inactive", count: 0 },
    { key: "locked", name: "Locked", count: 0 }
  ];
  sortStatus: string = 'all';

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  public pageEvent: PageEvent;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const totalUserStatusSubscription = this.store.pipe(select(getUserTotalStatus))
      .subscribe(res => {
        this.sortStatuses[0].count = res.all;
        this.sortStatuses[1].count = res.active;
        this.sortStatuses[2].count = res.inActive;
        this.sortStatuses[3].count = res.locked;
      });
    this.subscriptions.push(totalUserStatusSubscription);

    // Init paginator
    this.activatedRoute.queryParams.subscribe(
      (params: { page: number; pageSize: number; keyword: string, status: string }) => {
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

        if (params.status) {
          this.sortStatus = params.status;
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
          if (event.keyCode === 13) {
            this.search();
          }
        })
      )
      .subscribe();
    this.subscriptions.push(searchSubscription);

    // Pagination
    const paginatorSubscription = this.paginator.page
      .pipe(
        tap(() => {
          this.loadUsersList();
        })
      )
      .subscribe();
    this.subscriptions.push(paginatorSubscription);

    // Init DataSource
    this.dataSource = new UsersDataSource(this.store);
    const entityDataSourceSubscription = this.dataSource.entitySubject
      .pipe(skip(1), distinctUntilChanged())
      .subscribe();
    this.subscriptions.push(entityDataSourceSubscription);

    // First Load
    this.loadUsersList();

    this.store.dispatch(new UserAllTotalAction(this.searchInput.nativeElement.value));
    this.store.dispatch(new UserActiveTotalAction(this.searchInput.nativeElement.value));
    this.store.dispatch(new UserInActiveTotalAction(this.searchInput.nativeElement.value));
    this.store.dispatch(new UserLockedTotalAction(this.searchInput.nativeElement.value));
  }

  search() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.pageSize;
    const params = {
      pageIndex: 0,
      pageSize: this.pageSize
    };
    this.getPaginatorData(params);
    this.loadUsersList();

    this.sortStatuses[0].count = 0;
    this.sortStatuses[1].count = 0;
    this.sortStatuses[2].count = 0;
    this.sortStatuses[3].count = 0;

    this.store.dispatch(new UserAllTotalAction(this.searchInput.nativeElement.value));
    this.store.dispatch(new UserActiveTotalAction(this.searchInput.nativeElement.value));
    this.store.dispatch(new UserInActiveTotalAction(this.searchInput.nativeElement.value));
    this.store.dispatch(new UserLockedTotalAction(this.searchInput.nativeElement.value));
  }

  loadUsersList() {
    const queryParams = new QueryParamsModel(
      this.filterConfiguration(),
      '',
      '',
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    this.store.dispatch(new LoadUsersAction({ page: queryParams, sortStatus: this.sortStatus }));
  }

  filterConfiguration(): any {
    const filter: {
      field: string;
      value: string;
    } = {
      field: "all",
      value: this.searchInput.nativeElement.value
    };

    return filter;
  }

  sortByStatus(status: string) {
    this.sortStatus = status;
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.pageSize;
    const params = {
      pageIndex: 0,
      pageSize: this.pageSize
    };
    this.getPaginatorData(params);
    this.loadUsersList();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  getPaginatorData(event) {
    const keyword = this.searchInput.nativeElement.value;

    this.router.navigate([location.pathname], {
      queryParams: { page: event.pageIndex, pageSize: event.pageSize, keyword, status: this.sortStatus }
    });

    return event;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  openDialogCreateUser(): void {
    const dialogRef = this.dialog.open(UserCreateDialogComponent, { data: "" });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([result, "edit"], {
          relativeTo: this.activatedRoute
        });
      }
    });
  }
  getItemIndex(no: number): number {
    return this.paginator.pageIndex * this.paginator.pageSize + no;
  }
}
