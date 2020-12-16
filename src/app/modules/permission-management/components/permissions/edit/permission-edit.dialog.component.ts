// Angular
import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource
} from "@angular/material";
// RxJS
import { Observable, of, Subscription, fromEvent } from "rxjs";
import { delay } from 'rxjs/operators';
// Lodash
import { filter, uniqBy, cloneDeep } from "lodash";
// NGRX
import { Update } from "@ngrx/entity";
import { Store, select } from "@ngrx/store";
// State
import { AppState } from "@core-ui/reducers";
import { PermissionModel } from "../../../_models/permission.model";
import {
  LoadRolesAction,
  FilterRolesAction
} from "@app/modules/role-management/_actions/role.actions";
import { RolesDataSource } from "@app/modules/role-management/_data-sources/roles.datasource";
import { skip, distinctUntilChanged, debounceTime, tap, take } from "rxjs/operators";
import { RoleModel } from "@app/modules/role-management/_models/role.model";
import { UserModel } from "@app/modules/user-management/_models/user.model";
import { selectUsersAC } from "@app/modules/role-management/_selectors/users-role.selectors";
import { SearchUsersAction } from "@app/modules/role-management/_actions/user-role.actions";
import { selectPermissionTypes, selectPermissionsPageLoading } from "@app/modules/permission-management/_selectors/permission.selector";
import { UpdatePermissionAction } from '@app/modules/permission-management/_actions/permission.action';

export interface Permission {
  name: string;
  activated: boolean;
}
export interface UserPermission {
  objectName: string;
  permissions?: Permission[];
}

@Component({
  selector: "kt-permission-edit-dialog",
  templateUrl: "./permission-edit.dialog.component.html",
  styleUrls: ['./permission-edit.dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PermissionEditDialogComponent implements OnInit, OnDestroy {
  @ViewChild("searchRoleInput", { static: true }) searchRoleInput: ElementRef;
  @ViewChild("searchUserInput", { static: true }) searchUserInput: ElementRef;
  private subscriptions: Subscription[] = [];
  public permissionTypes: string[];

  loadingAfterSubmit: boolean = false;
	viewLoading: boolean = false;

  permissionId: string;

  // User
  selectedUser: UserModel;
  userAutoCompleteData: {
    isLoading$: Observable<boolean>;
    users: UserModel[];
  } = {
    isLoading$: of(false),
    users: []
  };

  // Role
  private roleSearchDataSource: RolesDataSource;
  selectedRole: RoleModel;
  rolesResult: RoleModel[] = [];
  roleKeyword: string = "";

  // Table columns
  displayedColumns = [];
  userDisplayedColumns = [];
  roleDisplayedColumns = [];

  // Data sources
  dataSource = new MatTableDataSource<UserPermission>([]);
  userDataSource = new MatTableDataSource<UserPermission>([]);
  roleDataSource = new MatTableDataSource<UserPermission>([]);

  checked: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<PermissionEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      permission: PermissionModel;
    },
    private store: Store<AppState>
  ) {
    this.permissionId = data.permission.PermissionId;

    const permissionTypesSubscription = this.store
      .pipe(select(selectPermissionTypes))
      .subscribe((permissionTypes: string[]) => {
        this.permissionTypes = permissionTypes;

        this.displayedColumns = ["userName", ...permissionTypes, "actions"];
        this.userDisplayedColumns = ["userName", ...permissionTypes, "actions"];
        this.roleDisplayedColumns = ["roleName", ...permissionTypes, "actions"];
      });

    this.subscriptions.push(permissionTypesSubscription);

    this.composeData(data.permission);
  }

  ngOnInit() {
    // Filtration, bind to search role
    const searchUserAutoCompleteSubscription = fromEvent(
      this.searchUserInput.nativeElement,
      "keyup"
    )
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap((event: any) => {
          if (this.selectedUser) {
            this.selectedUser = undefined;
          }
          const keyword = event.target.value;
          this.store.dispatch(new SearchUsersAction({ keyword }));
        })
      )
      .subscribe();
    this.subscriptions.push(searchUserAutoCompleteSubscription);

    const autoCompleteSubscription = this.store
      .pipe(select(selectUsersAC))
      .subscribe(
        (acData: { isLoading$: Observable<boolean>; users: UserModel[] }) => {
          this.userAutoCompleteData = acData;
        }
      );
    this.subscriptions.push(autoCompleteSubscription);

    // Filtration, bind to search role
    const searchSubscription = fromEvent(
      this.searchRoleInput.nativeElement,
      "keyup"
    )
      .pipe(
        debounceTime(50),
        distinctUntilChanged(),
        tap((event: any) => {
          if (this.selectedRole) {
            this.selectedRole = undefined;
          }
          this.filterListRoles();
        })
      )
      .subscribe();
    this.subscriptions.push(searchSubscription);

    // Page loading
    const pageLoadingSubscription = this.store.pipe(select(selectPermissionsPageLoading)).subscribe((isLoading: boolean) => {
      this.loadingAfterSubmit = isLoading;
      this.viewLoading = isLoading;
    });
    this.subscriptions.push(pageLoadingSubscription);

    // Init DataSource
    this.roleSearchDataSource = new RolesDataSource(this.store);
    const entityDataSourceSubscription = this.roleSearchDataSource.entitySubject
      .pipe(skip(1), distinctUntilChanged())
      .subscribe(res => {
        this.rolesResult = res;
      });
    this.subscriptions.push(entityDataSourceSubscription);

    // First Load
    this.loadRolesList();
  }

  composeData(permission: PermissionModel) {
    // Init data
    this.dataSource.data.push({
      objectName: "All",
      permissions: []
    });

    // Empty permissions
    if (!permission.Permissions) {
      return;
    }

    if (permission.Permissions.All) {
      Object.keys(permission.Permissions.All).map(p => {
        if (p === 'ObjectId') return;

        this.dataSource.data[0].permissions.push({
          name: p,
          activated: permission.Permissions.All[p]
        });
      });
    }

    // For user
    if (permission.Permissions.Users) {
      permission.Permissions.Users.map((uP, idx) => {
        const listPermissions: Permission[] = [];

        Object.keys(uP).map(p => {
          if (p === 'ObjectId') return;

          listPermissions.push({
            name: p,
            activated: uP[p]
          });
        });

        this.userDataSource.data.push({
          objectName: uP.ObjectId,
          permissions: listPermissions
        });
      });
    }

    // For role
    if (permission.Permissions.Roles) {
      permission.Permissions.Roles.map((rP, idx) => {
        const listPermissions: Permission[] = [];

        Object.keys(rP).map(p => {
          if (p === 'ObjectId') return;

          listPermissions.push({
            name: p,
            activated: rP[p]
          });
        });

        this.roleDataSource.data.push({
          objectName: rP.ObjectId,
          permissions: listPermissions
        });
      });
    }
  }

  loadRolesList() {
    this.store.dispatch(new LoadRolesAction());
  }

  filterListRoles() {
    this.roleKeyword = this.searchRoleInput.nativeElement.value;
    this.store.dispatch(new FilterRolesAction({ keyword: this.roleKeyword }));
  }

  displayUserFn(user: UserModel) {
    if (user) {
      return `${user.FirstName} ${user.LastName}`;
    }
  }

  roleDisplayFn(role: RoleModel) {
    if (role) {
      return role.RoleName;
    }
  }

	// User region
  onACSelectUser(user: UserModel) {
    this.selectedUser = user;
  }

  addUser() {
    if (!this.selectedUser) return;

    const permissions: Permission[] = [];

    this.permissionTypes.map(p => {
      permissions.push({
        name: p,
        activated: false
      });
    });

    this.userDataSource.data.push({
      objectName: this.selectedUser.Email,
      permissions
    });

    this.userDataSource.data = uniqBy(this.userDataSource.data, 'objectName'); // Distinct & update list
    this.searchUserInput.nativeElement.value = "";
    this.selectedUser = undefined;
	}

	removeUser(permission: UserPermission) {
		this.userDataSource.data = filter(this.userDataSource.data, (u) => u.objectName !== permission.objectName);
	}
	// End user region

	// Role region
  onACSelectRole(role: RoleModel) {
    this.selectedRole = role;
  }

  addRole() {
    if (!this.selectedRole) return;

    const permissions: Permission[] = [];

    this.permissionTypes.map(p => {
      permissions.push({
        name: p,
        activated: false
      });
    });

    this.roleDataSource.data.push({
      objectName: this.selectedRole.RoleName,
      permissions
    });

    this.roleDataSource.data = uniqBy(this.roleDataSource.data, 'objectName'); // Update list
    this.searchRoleInput.nativeElement.value = "";
    this.selectedRole = undefined;
	}

	removeRole(permission: UserPermission) {
		this.roleDataSource.data = filter(this.roleDataSource.data, (u) => u.objectName !== permission.objectName);
	}
	// End role region

  onSubmit() {
    const data: PermissionModel = this.prepareData();
    this.store.dispatch(new UpdatePermissionAction({ data, permissionId: this.permissionId }));
  }

  prepareData(): PermissionModel {
    const data: PermissionModel = cloneDeep(this.data.permission);

    this.dataSource.data[0].permissions.map((p) => {
      data.Permissions.All[p.name] = p.activated;
    });

    // Role
    data.Permissions.Roles = [];

    this.roleDataSource.data.map((item, idx) => {
      data.Permissions.Roles[idx] = {};
      data.Permissions.Roles[idx]['ObjectId'] = item.objectName;

      item.permissions.map((p) => {
        data.Permissions.Roles[idx][p.name] = p.activated;
      });
    });

    // User
    data.Permissions.Users = [];

    this.userDataSource.data.map((item, idx) => {
      data.Permissions.Users[idx] = {};
      data.Permissions.Users[idx]['ObjectId'] = item.objectName;

      item.permissions.map((p) => {
        data.Permissions.Users[idx][p.name] = p.activated;
      });
    });

    return data;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
