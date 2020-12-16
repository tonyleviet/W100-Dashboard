// Angular
import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// RxJS
import { BehaviorSubject, fromEvent, Subscription, Observable } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
// Auth
import { AuthService } from '@module/auth';
// State
import { AppState } from '@core-ui/reducers';
// Layout

import { selectAddressActionLoading, selectAddressList, getAddressError, selectAddressPageLoading, getAddressResponse } from '../../../../../_selectors/address.selectors';
import { AddressLoadAction, AddressCreateAction, AddressUpdateAction, AddressDeleteAction } from '../../../../../_actions/address.actions';
import { AddressModel } from '../../../../../_models/address.model';

// import * as _ from 'lodash';
import { isEmpty, cloneDeep, findIndex } from "lodash";
import { Update } from '@ngrx/entity';

import { UserModel } from '@app/modules/user-management/_models/user.model';
import { ToastService } from '@app/core-ui/views/components/toast/toast-service';
import { startWith } from 'rxjs/operators';

export enum ActionType {
  New = 'new', Update = 'update', Delete = "delete"
}
export const ACTION_TYPE_OPTION: { [key: string]: string } = {
  [ActionType.New]: 'New',
  [ActionType.Update]: 'Update',
  [ActionType.Delete]: 'Delete'
}

@Component({
	selector: 'kt-address',
	templateUrl: './address.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressComponent implements OnInit, OnDestroy {
  @Input() user: UserModel;

  hasFormErrors: boolean = false;

  data: AddressModel[];

  addressList$: Observable<AddressModel[]>;
	loadingPage$: Observable<boolean>;
	loading$: Observable<boolean>;
  // response$: Observable<any>;
  // error$: Observable<any>;
  private subscriptions: Subscription[] = [];

  actionName: ActionType = null;
  actionIndex: number = -1;

	/**
	 * Component Costructor
	 *
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param layoutUtilsService: LayoutUtilsService
	 */
	constructor(
		private auth: AuthService,
    private store: Store<AppState>,
    private toastService: ToastService
  ) {
    this.data = [];
  }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
    this.loadingPage$ = this.store.pipe(select(selectAddressPageLoading), startWith(true));
    this.loading$ = this.store.pipe(select(selectAddressActionLoading), startWith(true));

    this.addressList$ = this.store.pipe(select(selectAddressList));
    const addressListSubscription = this.addressList$.subscribe(
      (response: AddressModel[]) => {
        if (!isEmpty(response)) {
          this.data = [];
          this.data = cloneDeep(response);
        }
      }
    )
    this.subscriptions.push(addressListSubscription);

    if (!isEmpty(this.user)) {
      this.store.dispatch(new AddressLoadAction({ userId: this.user.UserId }));
    }
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  onAddSever(item: AddressModel) {
    this.actionName = ActionType.New;

    const _item = Object.assign({}, item);

    this.store.dispatch(new AddressCreateAction({ address: _item }));
  }

  onSaveServer(item: AddressModel) {
    this.actionName = ActionType.Update;

    const _item = Object.assign({}, item);

    const updatedItem: Update<AddressModel> = {
			id: _item.CS_ContactID,
			changes: _item
    };

    this.store.dispatch(new AddressUpdateAction({ partial: updatedItem, address: _item }));
  }

  onDeleteServer(item: AddressModel) {
    this.actionName = ActionType.Delete;

    this.store.dispatch(new AddressDeleteAction({ contactId: item.CS_ContactID }));
  }

  /**
   * Add new Address
   */
  addAddress() {
    const newAddress = new AddressModel();
    newAddress.CS_ContactID = this.data.length * -1;
    newAddress.UserID = this.user.UserId;
    newAddress.Email = this.user.Email;
    newAddress.FirstName = this.user.FirstName;
    newAddress.LastName = this.user.LastName;

    newAddress.Phone = this.user.Phone;
    newAddress.SecondaryPhone = this.user.SecondaryCellPhone;

    newAddress.Country = 'US';

    this.data.push(newAddress);
  }

	/**
	 * Update address
	 */
	updateAddress(item: { address: AddressModel, index: number}) {
    if (!isEmpty(item.address)) {
      if (item.address.CS_ContactID > 0) {
        this.onSaveServer(item.address);
      } else {
        this.actionIndex = item.index;
        this.onAddSever(item.address);
      }
    }
  }

  /**
	 * Remove address
	 */
  removeAddress(index: number) {
    const item = this.data[index];
    if (!isEmpty(item)) {
      if (item.CS_ContactID > 0) {
        this.onDeleteServer(item);
      }
      else {
        this.data.splice(index, 1);
      }
    }
  }

  allowRemove() {
    if (this.data.length > 1) {
      return true;
    }
    return false;
  }
}
