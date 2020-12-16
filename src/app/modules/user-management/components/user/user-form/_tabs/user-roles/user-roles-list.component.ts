// Angular
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
// RxJS
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { skip, distinctUntilChanged, startWith, map } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// Lodash
import { difference, isEmpty, cloneDeep } from 'lodash';
// State
import { AppState } from '@core-ui/reducers';
import { QueryResultsModel } from '@core-ui/_base/crud';
// Module Role
import { LoadRolesAction, FilterRolesAction } from '@module/role-management/_actions/role.actions';
import { RolesDataSource } from '@module/role-management/_data-sources/roles.datasource';
import { selectRolesPageLoading, selectRolesInStore } from '@module/role-management/_selectors/role.selectors';

import { UserModel } from '../../../../../_models/user.model';
import { getUserActionResponse, getRoleInSelectUser } from '../../../../../_selectors/user.selectors';
import { UserRoleAddAction, UserRoleRemoveAction, UserClearAction, UserRoleLoadAction } from '../../../../../_actions/user.actions';


export enum ActionType {
  Assigned = 'assigned', Unassigned = "Unassigned"
}
@Component({
	selector: 'kt-user-roles-list',
	templateUrl: './user-roles-list.component.html'
})
export class UserRolesListComponent implements OnInit, OnDestroy {
	// Public properties
  // Incoming data
  @Input('user') userData: UserModel;
  @Input('loading') loading$ = new BehaviorSubject<boolean>(false);
  @Input('active') isActive: boolean = false;

  // Roles
  roleIdForAdding: number;

	loadingUserAction$: Observable<boolean>;

  loadingRoleList$: Observable<boolean>;
  listRoles$: Observable<QueryResultsModel>;
  listUserRoles$: Observable<string[]>;
  reponse$: Observable<any>;

  myControl = new FormControl();
  filteredRoles: Observable<string[]>;

  roleList: string[] = [];
  assignRoles: string[] = [];
  unassignedRoles: string[] = [];

  public dataSource: RolesDataSource;
  private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(
    private store: Store<AppState>
  ) { }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
    this.loadingRoleList$ = this.store.pipe(select(selectRolesPageLoading));

    // Get Roles In User
    this.listUserRoles$ = this.store.pipe(select(getRoleInSelectUser()));
    const listUserRolesSubscription = this.listUserRoles$
      .subscribe(res => {
        if (res) {
          this.assignRoles = cloneDeep(res).sort();
        }

      });
    this.subscriptions.push(listUserRolesSubscription);

    // Event listening when Response has value
    this.reponse$ = this.store.pipe(select(getUserActionResponse));
    const responseSubscription = this.reponse$
      .subscribe(res => {
        if (this.isActive && res == true) {
          this.onAction();
        }
      });
    this.subscriptions.push(responseSubscription);

    // Get All Roles
    this.dataSource = new RolesDataSource(this.store);
    const entityDataSourceSubscription = this.dataSource.entitySubject
      .pipe(skip(1), distinctUntilChanged())
      .subscribe(res => {
        if (!isEmpty(res)) {
          this.roleList = res.map(x => x.RoleName);
          this.onAction();
        }
      });
    this.subscriptions.push(entityDataSourceSubscription);

    this.store.dispatch(new FilterRolesAction({ keyword: "" }));
    this.store.dispatch(new LoadRolesAction());

    // Get Roles By User
    this.store.dispatch(new UserRoleLoadAction({ user: this.userData }));

    // Autocomplet Role
    this.filteredRoles = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.unassignedRoles.filter(role => role.toLowerCase().indexOf(filterValue) === 0);
  }

  onAction() {
    this.unassignedRoles = difference(this.roleList, this.assignRoles);
    this.myControl.setValue('');
  }

  validateRoleValue(value: string) {
    if (!value) return false;
    if (this.unassignedRoles.indexOf(value) == -1) return false;
    return true;
  }

	/**
	 * Assign role
	 */
	assignRole(roleName: string) {
    if (roleName) {
      this.store.dispatch(new UserRoleAddAction({
        user: this.userData,
        roleName: roleName
      }));
    }
	}

	unassingRole(roleName: string, index: number) {
    if(roleName) {
      this.store.dispatch(new UserRoleRemoveAction({
        user: this.userData,
        roleName: roleName
      }));
    }
	}
}
