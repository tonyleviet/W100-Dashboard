// Angular
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
// Lodash
import { isEmpty, isEqual, cloneDeep } from "lodash";
// moment
import * as moment from 'moment';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '@core-ui/reducers';
// Layout
import { SubheaderService } from '@core-ui/_base/layout';
import { ToastService } from '@core-ui/views/components/toast/toast-service';
// Config
import { AdminConfig } from '@core/index';
// Services and Models
import { UserModel, US_STATE_ENUM_OPTIONS } from '../../../_models/user.model';
import { selectUsersActionLoading, getUserActionError, getSelectUser } from '../../../_selectors/user.selectors';
import { LoadUserAction, UserUpdateAction, UserClearAction } from '../../../_actions/user.actions';

import { MatTabChangeEvent, MatTabGroup, MatTab, MatTabHeader } from '@angular/material';
import { LayoutUtilsService, TypesUtilsService } from '@app/core-ui/_base/crud';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  styles: [`
    ::ng-deep .mat-tab-body-content {
      height: unset !important;
    }
  `]
})
export class UserFormComponent implements OnInit, OnDestroy {
  @ViewChild('tabs', { static: true }) tabs: MatTabGroup;
  @ViewChild('profileForm', {static: false}) profileForm: NgForm;
	// Public properties
	user: UserModel;
	// userId$: Observable<number>;
	oldUser: UserModel;
  selectedTab: number = 0;

  userName = '';

	loading$: Observable<boolean>;
  error$: Observable<any>;
	hasFormErrors: boolean = false;
	// Private properties
  private subscriptions: Subscription[] = [];

  stateUS = US_STATE_ENUM_OPTIONS;
  adminConfig = AdminConfig;

  maxDate: Date;
  inputDate: Date;
  isValidDate = true;

	/**
	 * Component constructor
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param subheaderService: SubheaderService
	 * @param store: Store<AppState>
	 */
	constructor(
    private activatedRoute: ActivatedRoute,
		private router: Router,
		private subheaderService: SubheaderService,
    private store: Store<AppState>,
    private toastService: ToastService,
    private layoutUtilsService: LayoutUtilsService,
    public typesUtilsService: TypesUtilsService
  ) {
    this.user = new UserModel();
  }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
    this.maxDate = new Date();
    this.loading$ = this.store.pipe(select(selectUsersActionLoading));

    this.userName = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadUserProfile();
    this.initUser();

    this.error$ = this.store.pipe(select(getUserActionError));
    const errorSubscription = this.error$.subscribe(
      error => {
        if (error && this.selectedTab == 0) {
          // User not found.
          if (error.InternalCode && error.InternalCode == 2) {
            this.goBackWithId();
          }
        }
        this.store.dispatch(new UserClearAction({}));
      }
    );
    this.subscriptions.push(errorSubscription);
  }

  nextStep = 0;
  selectedIndexChange(event: any) {
    this.tabs.selectedIndex = this.selectedTab = event;
    // if (this.selectedTab === 0 && !this.isModifyUser()) {
    //   this.nextStep = event;
    //   this.tabs.selectedIndex = this.selectedTab;

    //   const _title: string = "Update User";
    //   const _description: string = `Do you really want to leave the tab Profile and all User field modified will be revert ?`;
    //   const _waitDesciption: string = "Waiting...";
    //   const _buttons = {
    //     cancelText: 'Cancel',
    //     okText: 'Accept'
    //   };
    //   const dialogRef = this.layoutUtilsService.deleteElement(
    //     _title,
    //     _description,
    //     _waitDesciption,
    //     _buttons
    //   );

    //   dialogRef.afterClosed().subscribe(res => {
    //     if (res) {
    //       this.tabs.selectedIndex = this.selectedTab = this.nextStep;
    //       this.reset();
    //     }
    //   });
    // } else {
    //   this.tabs.selectedIndex = this.selectedTab = event;
    // }
  }

  isModifyUser() {
    return isEqual(this.user, this.oldUser);
  }

  loadUserProfile(){
    if (this.userName) {
      this.store.dispatch(new LoadUserAction({ email: this.userName }));
      this.store.pipe(select(getSelectUser())).subscribe(res => {
        if (res) {
          this.user = cloneDeep(res);
          this.oldUser = cloneDeep(this.user);
          if (this.user.BirthDay) {
            this.inputDate = moment(this.user.BirthDay).toDate();
          }
          this.store.dispatch(new UserClearAction({}));
        }
      });
    } else {
      this.toastService.showDanger('User not found.');
      this.goBackWithId();
    }
  }

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}

	/**
	 * Init user
	 */
	initUser() {
		this.subheaderService.setTitle('Edit user');
		this.subheaderService.setBreadcrumbs([
			{ title: 'User Management', page: `user-management` },
			{ title: 'Users',  page: `user-management/users` },
			{ title: 'Edit user', page: `user-management/users/edit`, queryParams: { email: this.user.Email } }
		]);
	}

	/**
	 * Redirect to list
	 *
	 */
	goBackWithId() {
		const url = `/user-management/users`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Refresh user
	 *
	 * @param isNew: boolean
	 * @param id: number
	 */
	refreshUser(isNew: boolean = false, id = '') {
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `/user-management/users/${id}/edit`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Reset
	 */
	reset() {
		this.user = cloneDeep(this.oldUser);
  }

  validateFormOnTab() {
    if (this.selectedTab == 0) {
      if (!this.isValidDate) {
        return false;
      }
      else if (this.profileForm) {
        return this.profileForm.form.valid;
      }
      return true;
    }
    return true;
  }

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSumbit(withBack: boolean = false) {
		// this.hasFormErrors = false;
    if (!this.validateFormOnTab()) {
      this.toastService.showDanger('User form invalid.');
      return;
    }

    const editedUser = this.prepareUser();

		if (editedUser.Email) {
			this.updateUser(editedUser, withBack);
			return;
		}
	}

	/**
	 * Returns prepared data for save
	 */
	prepareUser(): UserModel {
		return Object.assign({}, this.user);
	}

	/**
	 * Update user
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
	updateUser(_user: UserModel, withBack: boolean = false) {
		// Update User
		// tslint:disable-next-line:prefer-const

		const updatedUser: Update<UserModel> = {
			id: _user.Email,
			changes: _user
    };

    // this.store.dispatch(new UserUpdateAction({ partialUser: updatedUser, user: _user }));
    this.store.dispatch(new UserUpdateAction({ user: _user }));
	}

	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = 'Edit user - Lan Nguyen';
		if (!this.user || !this.user.Email) {
			return result;
		}

		result = `Edit user - ${this.user.Email}`;
		return result;
	}

	/**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
  }

  inputDateChange(value: string) {
    this.isValidDate = true;
    this.user.BirthDay = '';

    if (!value) return;
    if (value.indexOf('_') > -1) {
      if (value.split('_').length !== 9) {
        this.isValidDate = false;
      }
      return;
    }

    const _moment = moment(value, this.adminConfig.format.date);
    if (_moment.isValid()){
      this.user.BirthDay = _moment.format();
    } else {
      this.isValidDate = false;
    }
  }
}
