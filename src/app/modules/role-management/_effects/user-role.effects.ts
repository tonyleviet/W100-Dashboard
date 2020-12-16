import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "@core-ui/reducers";
import {
  UserRoleActionTypes,
  LoadUsersRoleAction,
  LoadUsersRoleSuccessAction,
  LoadUsersRoleFailureAction,
  SearchUsersActionToggleLoading,
  SearchUsersAction,
  SearchUserSuccessAction,
  AssignUserToRoleAction,
  AssignUserToRoleSuccess,
  RemoveUserFromRoleAction,
  RemoveUserFromRoleSuccess
} from "../_actions/user-role.actions";
import { RoleService } from "../services";
import { ToastService } from "@core-ui/views/components/toast/toast-service";

import { UserService } from "@module/user-management/services/user.service";
import { UserListResultModel } from "@app/modules/user-management/_models/user.model";
import { UsersRolePageToggleLoading } from "../_actions/user-role.actions";
import { forkJoin, of } from "rxjs";
import { QueryParamsModel } from "@app/core-ui/_base/crud";

@Injectable()
export class UserRoleEffects {
  showPageLoadingDispatcher = new UsersRolePageToggleLoading({
    isLoading: true
  });
  hidePageLoadingDispatcher = new UsersRolePageToggleLoading({
    isLoading: false
  });

  showAutocompleteActionLoadingDispatcher = new SearchUsersActionToggleLoading({
    isACLoading: true
  });
  hideAutocompleteActionLoadingDispatcher = new SearchUsersActionToggleLoading({
    isACLoading: false
  });

  @Effect()
  loadUsersRolePage$ = this.actions$.pipe(
    ofType<LoadUsersRoleAction>(UserRoleActionTypes.LOAD_USERS_ROLE),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showPageLoadingDispatcher);
      return this.roleService.getUsersInRole(payload.roleName);
    }),
    map(response => {
      return new LoadUsersRoleSuccessAction({
        totalCount: response.TotalResult,
        users: response.Users || []
      });
    }),
    catchError(error => of(new LoadUsersRoleFailureAction(error)))
  );

  @Effect()
  searchUsersAutocomplete = this.actions$.pipe(
    ofType<SearchUsersAction>(UserRoleActionTypes.SEARCH_USERS),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showAutocompleteActionLoadingDispatcher);
      return this.userService.searchUsers(payload.keyword);
    }),
    map(response => {
      return new SearchUserSuccessAction({
        users: response.Users || []
      });
    }),
    catchError((error, caught) => {
      this.store.dispatch(this.hideAutocompleteActionLoadingDispatcher);
      return caught;
    })
  );

  @Effect()
  assignUserToRole$ = this.actions$.pipe(
    ofType<AssignUserToRoleAction>(UserRoleActionTypes.ASSIGN_USER_TO_ROLE),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showAutocompleteActionLoadingDispatcher);
      return forkJoin(this.roleService.assignUserToRole(payload), of(payload))
    }),
    map(res => {
      const isSuccess = res[0];
      const payload = res[1];
      
      if (isSuccess) {
        this.store.dispatch(new LoadUsersRoleAction({ roleName: payload.roleName }));
        this.toastService.show("Assign user to role successfully!", {
          classname: "btn-primary"
        });
      } else {
        this.toastService.show("Assign user to role failed. Please try again!", {
          classname: "bg-danger text-light"
        });
      }

      return new AssignUserToRoleSuccess({});
    }),
    catchError((error, caught) => {
      this.toastService.show("Assign user to role failed. Please try again!", {
        classname: "bg-danger text-light"
      });
      this.store.dispatch(this.hideAutocompleteActionLoadingDispatcher);
      return caught;
    })
  );

  @Effect()
  removeUserFromRole$ = this.actions$.pipe(
    ofType<RemoveUserFromRoleAction>(UserRoleActionTypes.REMOVE_USER_TO_ROLE),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showPageLoadingDispatcher);
      return forkJoin(this.roleService.removeUserFromRole(payload), of(payload))
    }),
    map(res => {
      const isSuccess = res[0];
      const payload = res[1];
      
      if (isSuccess) {
        this.store.dispatch(new LoadUsersRoleAction({ roleName: payload.roleName }));
        this.toastService.show("Remove user from role successfully!", {
          classname: "btn-primary"
        });
      } else {
        this.toastService.show("Remove user to role failed. Please try again!", {
          classname: "bg-danger text-light"
        });
      }

      return new RemoveUserFromRoleSuccess({});
    }),
    catchError((error, caught) => {
      this.toastService.show("Remove user from role failed. Please try again!", {
        classname: "bg-danger text-light"
      });
      this.store.dispatch(this.hidePageLoadingDispatcher);
      return caught;
    })
  );

  constructor(
    private actions$: Actions,
    private roleService: RoleService,
    private userService: UserService,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {}
}
