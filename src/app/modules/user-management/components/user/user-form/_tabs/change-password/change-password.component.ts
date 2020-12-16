// Angular
import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
// Auth
import { AuthService, Login, UserLoaded } from '@module/auth/';
// State
import { AppState } from '@core-ui/reducers';
// Layout

import { AdminConfig } from '@core/index';
import { ToastService } from '@core-ui/views/components/toast/toast-service';

import { ChangePasswordModel, UserModel, ChangePasswordViewModel } from '../../../../../_models/user.model';
import { getUserActionError, getUserActionResponse } from '../../../../../_selectors/user.selectors';
import { UserChangePasswordAction, UserRestPasswordAction, UserClearAction } from '../../../../../_actions/user.actions';

@Component({
	selector: 'kt-change-password',
	templateUrl: './change-password.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
	// Public properties
	@Input('user') userData: UserModel;
  @Input('loading') loading$ = new BehaviorSubject<boolean>(false);
  @Input('active') isActive: boolean = false;

  form: FormGroup;
  model: ChangePasswordViewModel;
  adminConfig = AdminConfig;

	hasFormErrors: boolean = false;
	// user: UserModel;
  // changePasswordForm: FormGroup;
  hideOldPassword = true;
  hideNewPassword = true;
  hideConfirmNewPassword = true;

  messageSuccess: string = '';

  response$: Observable<any>;
  // error$: Observable<any>;
  private subscriptions: Subscription[] = [];
	/**
	 * Component constructor
	 *
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 */
	constructor(
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      NewPassword: new FormControl('', [
        Validators.min(6),
        Validators.max(12),
        Validators.required,
        Validators.pattern(this.adminConfig.regex.password)
      ]),
      ConfirmPassword: new FormControl('', [
        Validators.required,
        this.validateMustMatchPassword
      ])
    })
    this.onClear();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
    this.response$ = this.store.pipe(select(getUserActionResponse));
    const responseSubscription = this.response$.subscribe(
      response => {
        if (this.isActive && response) {
          this.onClear();
        }
        this.store.dispatch(new UserClearAction({}));
      }
    );
    this.subscriptions.push(responseSubscription);
  }

  validateMustMatchPassword(input) {
    if (!input.root || !input.root.controls) {
      return null;
    }

    const exactMatch = input.root.controls.NewPassword.value === input.value;
    console.log('line 103', exactMatch, input.root.controls.NewPassword.value, input.value);
    return exactMatch ? null : { mismatchedPassword: true };
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

	/**
	 * Save data
	 */
	onSubmit() {
    this.messageSuccess = `User change password successfully`;
    this.model.UserName = this.userData.UserName;
    // const changePassword = Object.assign({}, this.model);
    const changePassword = {
      UserName: this.userData.UserName,
      ...this.form.value,
    };

    this.store.dispatch(new UserChangePasswordAction({ changePassword: changePassword }));
  }

  onClear() {
    this.form.reset();
    this.model = new ChangePasswordViewModel();
    this.hasFormErrors = false;
    this.hideOldPassword = true;
    this.hideNewPassword = true;
    this.hideConfirmNewPassword = true;
  }

  onReset() {
    this.messageSuccess = `User reset password successfully`;
    const _userName = this.userData.UserName;
    this.store.dispatch(new UserRestPasswordAction({ userName: _userName }));
  }

  onImpersonate() {
    if (this.userData.Token) {
      this.store.dispatch(new Login({ userName: this.userData.Email, authToken: this.userData.Token }));
      this.store.dispatch(new UserLoaded({ user: Object.assign({}, this.userData) }));

      this.messageSuccess = `User impersonate successfully`;

      this.router.navigateByUrl('/');
    } else {
      this.toastService.showDanger("User don't have token.");
    }
  }

	/**
	 * Close alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		// this.hasFormErrors = false;
	}
}
