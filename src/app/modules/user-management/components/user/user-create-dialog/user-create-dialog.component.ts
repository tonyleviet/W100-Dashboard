import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, Injector, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AdminConfig } from '@core/index';
import { AppState } from '@core-ui/reducers';
import { ToastService } from '@core-ui/views/components/toast/toast-service';

import { US_STATE_ENUM_OPTIONS, UserModel } from '../../../_models/user.model';
import { UserCreatedAction } from '../../../_actions/user.actions';
import {
  selectUsersActionLoading, getUserActionResponse, getUserActionError,
} from '../../../_selectors/user.selectors';

import * as moment from 'moment';

@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.scss'],
})
export class UserCreateDialogComponent
  implements OnInit, OnDestroy {

  model: UserModel;

  stateUS = US_STATE_ENUM_OPTIONS;
  adminConfig = AdminConfig;

  hidePassword = true;
  hideConfirmPassword = true;

  isLoading = false;
  loading$: Observable<boolean>;
  responsive$: Observable<any>;
  error$: Observable<any>;
  // Private properties
  private subscriptions: Subscription[] = [];

  maxDate: Date;
  inputDate: string;
  isValidDate = true;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public toastService: ToastService,
    public dialogRef: MatDialogRef<UserCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.dialogRef.disableClose = true;

    this.loading$ = this.store.pipe(select(selectUsersActionLoading));
    const loadingSubscription = this.loading$.subscribe(
      loading => {
        this.isLoading = loading;
      }
    );
    this.subscriptions.push(loadingSubscription);

    this.model = new UserModel();

    const routeSubscription =  this.activatedRoute.params.subscribe(() => {
      // set default storeID
      this.model.StoreID = 132;

      this.model.ReceiveEmail = true;
      this.model.ReceiveTextMessage = true;
      this.model.LoyaltyAutoEnroll = true;
      this.model.IsAuthorized = true;
    });
    this.subscriptions.push(routeSubscription);

    this.error$ = this.store.pipe(select(getUserActionError));
    const errorSubscription = this.error$.subscribe(
      error => {
        if (error) {
          if (error.Message){
            this.toastService.showDanger(error.Message, 'Create User');
          } else {
            this.toastService.showDanger("Sorry, We're having trouble. Please try again.", 'Create User');
          }
        }
      }
    );
		this.subscriptions.push(errorSubscription);

    this.responsive$ = this.store.pipe(select(getUserActionResponse));
    const resSubscription = this.responsive$.subscribe(
      res => {
        if (res) {
          this.toastService.showSuccess(`User successfully has been saved.`)
          this.dialogRef.close(this.model.Email);
        }
      }
    );
		this.subscriptions.push(resSubscription);
  }

  ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}

  onSubmit() {
    if (!this.isValidDate) {
      return;
    }
    this.model.Email = this.model.Email.toLowerCase();
    this.model.UserName = this.model.UserName.toLowerCase();

    const _user = Object.assign({}, this.model);
    this.store.dispatch(new UserCreatedAction({ user: _user }));
  }

  inputDateChange(value: string) {
    this.isValidDate = true;
    this.model.BirthDay = '';

    if (!value) return;
    if (value.indexOf('_') > -1) {
      if (value.split('_').length !== 9) {
        this.isValidDate = false;
      }
      return;
    }

    const _moment = moment(value, this.adminConfig.format.date);
    if (_moment.isValid()){
      this.model.BirthDay = _moment.format(this.adminConfig.format.apiDateTime);
    } else {
      this.isValidDate = false;
    }
  }
}
