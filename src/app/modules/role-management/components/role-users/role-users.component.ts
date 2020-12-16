import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, PageEvent } from "@angular/material";
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  skip,
  switchMap
} from "rxjs/operators";
import { fromEvent, merge, Observable, of, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core-ui/reducers";
import { UsersRolesDataSource } from "../../_data-sources/users-roles.datasource";
import { Router, ActivatedRoute } from "@angular/router";
import {
  LoadUsersRoleAction,
  SearchUsersAction,
  AssignUserToRoleAction,
  RemoveUserFromRoleAction
} from "../../_actions/user-role.actions";
import { selectUsersAC } from "../../_selectors/users-role.selectors";
import { UserModel } from "@app/modules/user-management/_models/user.model";
import { LayoutUtilsService, MessageType } from "@core-ui/_base/crud";

@Component({
  selector: "app-role-users",
  templateUrl: "./role-users.component.html"
})
export class RoleUsersComponent implements OnInit, OnDestroy {
  public isAssignUserCollapsed = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("searchACInput", { static: true }) searchACInput: ElementRef;

  public dataSource: UsersRolesDataSource;
  private subscriptions: Subscription[] = [];

  // Auto Complete
  autoCompleteData: {
    isLoading$: Observable<boolean>;
    users: UserModel[];
  } = {
    isLoading$: of(false),
    users: []
  };

  public displayedColumns: string[] = ["id", "name", "userName", "email", "actions"];

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  roleName: string = "";

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const roleName = params.get("roleName");
      if (roleName) {
        this.roleName = roleName;
      }
    });

    // Auto complete
    const searchAutoCompleteSubscription = fromEvent(
      this.searchACInput.nativeElement,
      "keyup"
    )
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap((event: any) => {
          const keyword = event.target.value;
          this.store.dispatch(new SearchUsersAction({ keyword }));
        })
      )
      .subscribe();
    this.subscriptions.push(searchAutoCompleteSubscription);

    const autoCompleteSubscription = this.store
      .pipe(select(selectUsersAC))
      .subscribe(
        (acData: { isLoading$: Observable<boolean>; users: UserModel[] }) => {
          this.autoCompleteData = acData;
        }
      );
    this.subscriptions.push(autoCompleteSubscription);

    // Pagination
    const paginatorSubscription = this.paginator.page
      .pipe(
        tap(() => {
          this.loadUsersRoleList();
        })
      )
      .subscribe();
    this.subscriptions.push(paginatorSubscription);

    // Init DataSource
    this.dataSource = new UsersRolesDataSource(this.store);
    const entityDataSourceSubscription = this.dataSource.entitySubject
      .pipe(skip(1), distinctUntilChanged())
      .subscribe();
    this.subscriptions.push(entityDataSourceSubscription);

    // First Load
    this.loadUsersRoleList();
  }

  loadUsersRoleList() {
    this.store.dispatch(new LoadUsersRoleAction({ roleName: this.roleName }));
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  getPaginatorData(event) {
    this.router.navigate([location.pathname], {
      queryParams: { page: event.pageIndex, pageSize: event.pageSize }
    });

    return event;
  }

  displayFn(user: UserModel) {
    if (user) {
      return `${user.FirstName} ${user.LastName}`;
    }
  }

  assignUserToRole(user: UserModel) {
    this.store.dispatch(
      new AssignUserToRoleAction({
        roleName: this.roleName,
        userId: user.UserId
      })
    );
    this.searchACInput.nativeElement.value = "";
  }

  removeUserFromRole(user: UserModel) {
    const _title: string = "Remove User From Role";
    const _description: string = `Are you sure to remove this user from <strong>${this.roleName}</strong> role?`;
    const _waitDesciption: string = "Removing user from role...";
    const _buttons = {
      cancelText: 'Cancel',
      okText: 'Remove'
    };

    const dialogRef = this.layoutUtilsService.deleteElement(
      _title,
      _description,
      _waitDesciption,
      _buttons
    );

    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      console.log('user');
      console.log(user);
      this.store.dispatch(
        new RemoveUserFromRoleAction({
          roleName: this.roleName,
          userId: user.UserId
        })
      );
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
