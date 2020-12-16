import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";

import { AppState } from "@app/core-ui/reducers";
import { ToastService } from "@app/core-ui/views/components/toast/toast-service";

import { PermissionService } from "../services/permission.service";
import {
  PermissionPageToggleLoading,
  LoadPermissionsAction,
  PermissionActionTypes,
  LoadPermissionSuccessAction,
  LoadPermissionFailureAction,
  UpdatePermissionAction,
  UpdatePermissionSuccessAction,
  UpdatePermissionFailureAction,
  LoadPermissionMenuAction,
  SavePermissionMenuAction,
  PermissionMenuToggleLoading
} from "../_actions/permission.action";
import { PermissionMenuModel } from '../_models/permission.model';
import * as PermissionSelector from '../_selectors/permission.selector';

@Injectable()
export class PermissionEffects {
  showPageLoadingDispatcher = new PermissionPageToggleLoading({
    isLoading: true
  });
  hidePageLoadingDispatcher = new PermissionPageToggleLoading({
    isLoading: false
  });

  @Effect()
  loadPermissionsPage$ = this._actions$.pipe(
    ofType<LoadPermissionsAction>(PermissionActionTypes.LOAD_PERMISSIONS),
    mergeMap(({ payload }) => {
      this._store.dispatch(this.showPageLoadingDispatcher);
      return this._permissionService.getPermissions(payload.companyId);
    }),
    map(response => {
      const flat2tree = this._permissionService.flat2tree(response);
      const tree2flat = this._permissionService.tree2flat(flat2tree);

      return new LoadPermissionSuccessAction({
        permissions: tree2flat
      });
    }),
    catchError(error => of(new LoadPermissionFailureAction(error)))
  );

  @Effect()
  updatePermission$ = this._actions$.pipe(
    ofType<UpdatePermissionAction>(PermissionActionTypes.UPDATE_PERMISSION),
    mergeMap(({ payload }) => {
      return this._permissionService.update(payload.permissionId, payload.data);
    }),
    map(res => {
      if (!res) {
        this._toastService.showDanger("Update permission failed. Please try again!");
        return new UpdatePermissionFailureAction({ updated: false });
      }

      this._toastService.showSuccess("Update permission successfully!");
      return new UpdatePermissionSuccessAction({ updated: true });
    }),
    catchError((error, caught) => {
      this._toastService.showDanger("Update permission failed. Please try again!");
      return caught;
    })
  );

  @Effect()
  loadPermissionMenu$ = this._actions$.pipe(
    ofType<LoadPermissionMenuAction>(PermissionActionTypes.LOAD_PERMISSIONS_MENU),
    withLatestFrom(this._store.pipe(select(PermissionSelector.selectPermissionMenu))),
    switchMap(([action, menuInStore]) => {
      if (menuInStore.length > 0 && !action.payload.isRefesh) {
        return of(menuInStore);
      } else {
        return this._permissionService.getMenuPermission(action.payload.companyId, action.payload.userId)
      }
    }),
    map((response: PermissionMenuModel[]) => {
      return new SavePermissionMenuAction({menu: response, userPermission: this._permissionService.menu2flat(response)});
    }),
    catchError((error, caught) => {
      new PermissionMenuToggleLoading(false);
      this._toastService.showDanger("Load Menu failed. Please try again!");
      return caught;
    })
  );

  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _toastService: ToastService,
    private _permissionService: PermissionService
  ) {}
}
