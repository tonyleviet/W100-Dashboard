import { AppState } from "@core-ui/reducers";
import { map, mergeMap, catchError, tap } from "rxjs/operators";
import { forkJoin, of } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { RoleService } from "../services";
import {
  LoadRolesAction,
  RoleActionTypes,
  RolesPageToggleLoading,
  LoadRoleSuccessAction,
  LoadRoleFailureAction,
  RoleOnServerCreated,
  RoleCreated
} from "../_actions/role.actions";
import { RoleListResultModel } from "../_models/role.model";
import { ToastService } from "@core-ui/views/components/toast/toast-service";
import { UserListResultModel } from "@app/modules/user-management/_models/user.model";

@Injectable()
export class RoleEffects {
  showPageLoadingDispatcher = new RolesPageToggleLoading({ isLoading: true });
  hidePageLoadingDispatcher = new RolesPageToggleLoading({ isLoading: false });

  @Effect()
  loadRolesPage$ = this.actions$.pipe(
    ofType<LoadRolesAction>(RoleActionTypes.LOAD_ROLES),
    mergeMap(() => {
      this.store.dispatch(this.showPageLoadingDispatcher);
      return this.roleService.getRoles();
    }),
    map(response => {
      return new LoadRoleSuccessAction({
        roles: response
      });
    }),
    catchError(error => of(new LoadRoleFailureAction(error)))
  );

  @Effect()
  createRole$ = this.actions$.pipe(
    ofType<RoleOnServerCreated>(RoleActionTypes.ROLE_ON_SERVER_CREATED),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showPageLoadingDispatcher);
      return this.roleService.createRole(payload.role);
    }),
    map(res => {
      this.store.dispatch(this.hidePageLoadingDispatcher);
      if (res) {
        this.store.dispatch(new LoadRolesAction());
        this.toastService.show("Create new role successfully!", {
          classname: "btn-primary"
        });
      } else {
        this.toastService.show("Create new role failed. Please try again!", {
          classname: "bg-danger text-light"
        });
      }
      return new RoleCreated({ created: res });
    }),
    catchError((error, caught) => {
      this.toastService.show("Create new role failed. Please try again!", {
        classname: "bg-danger text-light"
      });
      this.store.dispatch(this.hidePageLoadingDispatcher);
      return caught;
    })
  );

  constructor(
    private actions$: Actions,
    private roleService: RoleService,
    private store: Store<AppState>,
    private toastService: ToastService
  ) {}
}
