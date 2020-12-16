import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, finalize, mergeMap, concat } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from '@core-ui/reducers';

import { ToastService } from '@app/core-ui/views/components/toast/toast-service';
import { UserService } from '../services';
import {
  AddressActionTypes, AddressPageToggleLoading, AddressActionToggleLoading,
  AddressLoadAction, AddressLoadSuccessAction, AddressLoadFailureAction,
  AddressCreateAction, AddressUpdateSuccessAction, AddressCreateFailureAction,
  AddressUpdateAction, AddressUpdateFailureAction, AddressDeleteAction,
  AddressDeleteSuccessAction, AddressDeleteFailureAction, AddressCreateSuccessAction
} from '../_actions/address.actions';

@Injectable()
export class AddressEffects {
  showPageLoadingDispatcher = new AddressPageToggleLoading({ isLoading: true });
	hidePageLoadingDispatcher = new AddressPageToggleLoading({ isLoading: false });

  showActionLoadingDistpatcher = new AddressActionToggleLoading({ isLoading: true });
  hideActionLoadingDistpatcher = new AddressActionToggleLoading({ isLoading: false });

	constructor(
		private actions$: Actions,
		private store: Store<AppState>,
    private userService: UserService,
    private toastService: ToastService
	) { }

  @Effect()
  loadAddressPage$ = this.actions$
    .pipe(
      ofType<AddressLoadAction>(AddressActionTypes.ADDRESS_LOAD),
      mergeMap(({ payload }) => {
        this.store.dispatch(this.showPageLoadingDispatcher)
        return this.userService.getUserAddress(payload.userId).pipe(
          map(response => {
            this.store.dispatch(this.hidePageLoadingDispatcher);
            return new AddressLoadSuccessAction({
              address: response
            });
          }),
          catchError(error => {
            this.store.dispatch(this.hidePageLoadingDispatcher);
            return of(new AddressLoadFailureAction(error));
          })
        );
      })
    );

  @Effect()
  createAddress$ = this.actions$
    .pipe(
      ofType<AddressCreateAction>(AddressActionTypes.ADDRESS_CREATE),
      switchMap(({ payload }) => {
        this.store.dispatch(this.showActionLoadingDistpatcher);
        return this.userService.addUserAddress(payload.address).pipe(
          map(response => {
            this.store.dispatch(this.hideActionLoadingDistpatcher);
            if (response == true) {
              this.toastService.showSuccess("Address successfully has been created", `Address`);
              return new AddressCreateSuccessAction({
                address: payload.address,
                response: response
              });
            } else {
              this.toastService.showDanger("Sorry, We're having trouble. Please try again.", `Address`);
              return new AddressCreateFailureAction({ error: '' });
            }
          }),
          catchError(error => {
            this.store.dispatch(this.hideActionLoadingDistpatcher);
            this.toastService.showDanger(error.error.Message, 'Address');

            return of(new AddressCreateFailureAction(error));
          })
        );
      })
    );

  @Effect()
  updateAddress$ = this.actions$
    .pipe(
      ofType<AddressUpdateAction>(AddressActionTypes.ADDRESS_UPDATE),
      switchMap(({ payload }) => {
        this.store.dispatch(this.showActionLoadingDistpatcher);
        return this.userService.updateUserAddress(payload.address).pipe(
          map(response => {
            this.store.dispatch(this.hideActionLoadingDistpatcher);
            if (response == true) {
              this.toastService.showSuccess("Address successfully has been updated", `Address`);
              return new AddressUpdateSuccessAction({
                partial: payload.partial,
                address: payload.address,
                response: response
              });
            } else {
              this.toastService.showDanger("Sorry, We're having trouble. Please try again.", `Address`);
              return new AddressUpdateFailureAction({ error: "" });
            }
          }),
          catchError(error => {
            this.store.dispatch(this.hideActionLoadingDistpatcher);
            this.toastService.showDanger(error.error.Message, 'Address');
            return of(new AddressUpdateFailureAction(error));
          })
        );
      })
    );

  @Effect()
  deleteAddress$ = this.actions$
    .pipe(
      ofType<AddressDeleteAction>(AddressActionTypes.ADDRESS_DELETE),
      switchMap(({ payload }) => {
        this.store.dispatch(this.showActionLoadingDistpatcher);
        return this.userService.deleteUserAddress(payload.contactId).pipe(
          map(response => {
            this.store.dispatch(this.hideActionLoadingDistpatcher);
            if (response == true) {
              this.toastService.showSuccess("Address successfully has been deleted", `Address`);
              return new AddressDeleteSuccessAction({
                contactId: payload.contactId,
                response: response
              });
            }else {
              this.toastService.showDanger("Sorry, We're having trouble. Please try again.", `Address`);
              return new AddressDeleteFailureAction({ error: "" });
            }
          }),
          catchError(error => {
            this.store.dispatch(this.hideActionLoadingDistpatcher);
            this.toastService.showDanger(error.error.Message, 'Address');
            return of(new AddressDeleteFailureAction(error));
          })
        );
      })
    )
}
