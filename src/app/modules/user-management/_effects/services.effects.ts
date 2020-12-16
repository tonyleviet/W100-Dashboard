import { Injectable } from "@angular/core";

import { switchMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';

import { AppState } from '@app/core-ui/reducers';
import { ToastService } from '@app/core-ui/views/components/toast/toast-service';
import { ToggleLoadingAction } from '@app/core-ui/_actions/loading.actions';

import { ServicesService } from '../services';
import { ServicesModel } from '../_models/services.model';
import {
  FetchAllServicesAction,
  UserActionTypes,
  SaveAllServicesAction
} from '../_actions/user.actions';

@Injectable()
export class ServicesEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _toastService: ToastService,
    private _servicesService: ServicesService,
  ) { }

  private _showError(error: any) {
    this._toastService.showDanger(error && error.error ? error.error.Message : 'Something went wrong, please try again!');
  }
  private _loading(action: string) {
    this._store.dispatch(new ToggleLoadingAction({
      currentAction: action
    }));
  }

  @Effect()
  loadAllServices$ = this._actions$
    .pipe(
      ofType<FetchAllServicesAction>(UserActionTypes.FETCH_ALL_SERVICE),
      switchMap(({ serviceType }) => {
        return this._servicesService.getAllServices(serviceType);
      }),
      map((response: ServicesModel[]) => {
        return new SaveAllServicesAction(response);
      }),
      catchError((error, caught) => {
        this._showError(error.Title);
        return caught;
      })
    );
}
