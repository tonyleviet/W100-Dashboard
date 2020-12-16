import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Subscription, fromEvent, of, Observable } from "rxjs";
import { AppState } from "@core-ui/reducers";
import {
  LoadRolesAction,
  RoleOnServerCreated,
  FilterRolesAction,
  RolesActionToggleLoading
} from "../../_actions/role.actions";
import { RolesDataSource } from "../../_data-sources/roles.datasource";
import { skip, distinctUntilChanged, debounceTime, tap } from "rxjs/operators";
import { SubheaderService } from "@core-ui/_base/layout";
import { RoleModel } from "../../_models/role.model";
import { selectCreatedRoleSuccess, selectRolesPageLoading } from "../../_selectors/role.selectors";

const ROLE_NAME_REGEX = /[^a-zA-Z0-9_\- ]/;

@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleListComponent implements OnInit, OnDestroy {
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;

  public dataSource: RolesDataSource;
  private subscriptions: Subscription[] = [];
  roles: RoleModel[] = [];
  rolesResult: RoleModel[] = [];
  isAddRoleCollapsed: boolean = true;
  isLoading$: Observable<boolean>;

  // Form
  role: RoleModel;
  role$: Observable<RoleModel>;
  hasFormErrors: boolean = false;

  constructor(
    private store: Store<AppState>,
    private subheaderService: SubheaderService
  ) {}

  ngOnInit() {
    this.subheaderService.setTitle("Role management");
    this.isLoading$ = this.store.pipe(select(selectRolesPageLoading));

    const newRole = new RoleModel();
    newRole.clear();

    this.role$ = of(newRole);
    this.role$.subscribe(res => {
      if (!res) return;

      this.role = new RoleModel();
      this.role.RoleName = res.RoleName;
    });

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

    // Init DataSource
    this.dataSource = new RolesDataSource(this.store);
    const entityDataSourceSubscription = this.dataSource.entitySubject
      .pipe(skip(1), distinctUntilChanged())
      .subscribe(res => {
        this.roles = res;
        this.rolesResult = res;
      });
    this.subscriptions.push(entityDataSourceSubscription);

    // First Load
    this.loadRolesList();
  }

  loadRolesList() {
    this.store.dispatch(new LoadRolesAction());
  }

  filterList() {
    const keyword = this.searchInput.nativeElement.value;
    this.store.dispatch(new RolesActionToggleLoading({ isLoading: true }));
    this.store.dispatch(new FilterRolesAction({ keyword }));
  }

  onSubmit() {
    this.hasFormErrors = false;
    if (!this.isNameValid()) {
      this.hasFormErrors = true;
      return;
    }

    const _role = new RoleModel();
    _role.RoleName = this.role.RoleName;

    this.store.dispatch(new RoleOnServerCreated({ role: _role }));
    const createdRoleSuccessSubs = this.store
      .pipe(select(selectCreatedRoleSuccess))
      .subscribe(res => {
        if (res) {
          this.role.clear();
        }
      });

    this.subscriptions.push(createdRoleSuccessSubs);
  }

  isNameValid(): boolean {
    const name = this.role.RoleName.trim();

    if (name === "") return false;
    return !ROLE_NAME_REGEX.test(this.role.RoleName);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
