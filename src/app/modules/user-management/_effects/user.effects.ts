import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { forkJoin, of } from "rxjs";
import {
  map,
  tap,
  mergeMap,
  catchError,
  switchMap,
  finalize,
} from "rxjs/operators";
// Lodash
import { isEmpty, cloneDeep } from "lodash";

import { AppState } from "@core-ui/reducers";
import { QueryParamsModel } from "@core-ui/_base/crud";
import { ToastService } from "@core-ui/views/components/toast/toast-service";

import { RoleService } from "@module/role-management/services";

import {
  UserActionTypes,
  UsersPageToggleLoading,
  UsersActionToggleLoading,
  LoadUsersAction,
  LoadUserSuccessAction,
  LoadUserFailureAction,
  UserCreatedAction,
  UserCreateFailure,
  UserCreateSuccess,
  LoadUserAction,
  LoadUserSuccess,
  LoadUserFailure,
  UserUpdateAction,
  UserUpdateFailure,
  UserUpdateSuccess,
  UserChangePasswordAction,
  UserChangePasswordFailure,
  UserChangePasswordSuccess,
  UserRestPasswordAction,
  UserRestPasswordSuccess,
  UserRestPasswordFailure,
  UserRoleAddAction,
  UserRoleAddSuccess,
  UserRoleAddFailure,
  UserRoleRemoveAction,
  UserRoleRemoveSuccess,
  UserRoleRemoveFailure,
  UserRoleLoadAction,
  UserRoleLoadSuccess,
  UserRoleLoadFailure,
  UserAllTotalAction,
  UserAllTotalSuccessAction,
  UserAllTotalFailureAction,
  UserActiveTotalAction,
  UserActiveTotalSuccessAction,
  UserActiveTotalFailureAction,
  UserInActiveTotalAction,
  UserInActiveTotalSuccessAction,
  UserInActiveTotalFailureAction,
  UserLockedTotalAction,
  UserLockedTotalSuccessAction,
  UserLockedTotalFailureAction,
  FetchAllStoresAction,
  FetchAllStoresSuccessAction,
  FetchUserStoresAction,
  FetchUserStoresSuccessAction,
  AddUserStoreAction,
  AddUserStoreSuccessAction,
  UpdateUserStoreAction,
  UpdateUserStoreSuccessAction,
  RemoveUserStoreAction,
  RemoveUserStoreSuccessAction,
  FetchStoreDetailsAction,
  FetchStoreDetailsSuccessAction,
} from "../_actions/user.actions";
import { UserService } from "../services";
import { UserListResultModel, UserModel } from "../_models/user.model";
import { ToggleLoadingAction } from "@app/core-ui/_actions/loading.actions";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@Injectable()
export class UserEffects {
  showPageLoadingDispatcher = new UsersPageToggleLoading({ isLoading: true });
  hidePageLoadingDispatcher = new UsersPageToggleLoading({ isLoading: false });

  showActionLoadingDistpatcher = new UsersActionToggleLoading({
    isLoading: true,
  });
  hideActionLoadingDistpatcher = new UsersActionToggleLoading({
    isLoading: false,
  });

  @Effect()
  loadUsersPage$ = this.actions$.pipe(
    ofType<LoadUsersAction>(UserActionTypes.LOAD_USERS),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showPageLoadingDispatcher);

      const request = this.userService.getUsers(
        payload.page,
        payload.sortStatus
      );
      const lastQuery = of(payload.page);

      return forkJoin(request, lastQuery);
    }),
    map((response) => {
      const result: UserListResultModel = response[0];
      const lastQuery: QueryParamsModel = response[1];

      return new LoadUserSuccessAction({
        totalCount: result.TotalResult,
        users: result.Users || [],
        page: lastQuery,
      });
    }),
    catchError((error) => of(new LoadUserFailureAction(error)))
  );

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType<LoadUserAction>(UserActionTypes.LOAD_USER),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showActionLoadingDistpatcher);

      return this.userService.getUserByEmail(payload.email).pipe(
        map((response) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);
          if (!isEmpty(response)) {
            return new LoadUserSuccess({ user: response, response: true });
          } else {
            this.toastService.showDanger(
              "Sorry, We're having trouble. Please try again.",
              `User`
            );
            return new LoadUserFailure({ error: "" });
          }
        }),
        catchError((error) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);
          return of(new LoadUserFailure(error));
        })
      );
    })
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType<UserUpdateAction>(UserActionTypes.USER_UPDATE),
    switchMap(({ payload }) => {
      this.store.dispatch(this.showActionLoadingDistpatcher);
      return this.userService.updateUser(payload.user).pipe(
        map((response) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);
          if (response == true) {
            this.toastService.showSuccess(
              "User successfully has been update",
              `User`
            );
            return new UserUpdateSuccess({
              user: payload.user,
              response: response,
            });
          } else {
            this.toastService.showDanger(
              "Sorry, We're having trouble. Please try again.",
              `User`
            );
            return new UserUpdateFailure({ error: "" });
          }
        }),
        catchError((error) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);
          this.toastService.showDanger(error.error.Message, "User Profile");
          return of(new UserUpdateFailure(error));
        })
      );
    })
  );

  @Effect()
  createUser$ = this.actions$.pipe(
    ofType<UserCreatedAction>(UserActionTypes.USER_CREATED),
    switchMap(({ payload }) => {
      this.store.dispatch(this.showActionLoadingDistpatcher);
      return this.userService.createUser(payload.user).pipe(
        map((response) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);
          return new UserCreateSuccess({
            response: response,
          });
        }),
        catchError((error) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);
          return of(new UserCreateFailure(error));
        })
      );
    })
  );

  @Effect()
  changePasswordUser$ = this.actions$.pipe(
    ofType<UserChangePasswordAction>(UserActionTypes.USER_CHANGE_PASSWORD),
    switchMap(({ payload }) => {
      this.store.dispatch(this.showActionLoadingDistpatcher);
      return this.userService.changePasswordUser(payload.changePassword).pipe(
        map((response) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);
          if (response == true) {
            this.toastService.showSuccess(
              "User successfully has been change password",
              `User`
            );
            return new UserChangePasswordSuccess({ response: response });
          } else {
            this.toastService.showDanger(
              "Sorry, We're having trouble. Please try again.",
              `User`
            );
            return new UserChangePasswordFailure({ error: "" });
          }
        }),
        catchError((error) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);
          this.toastService.showDanger(
            error.error.Message,
            "User Change Password"
          );
          return of(new UserChangePasswordFailure(error));
        })
      );
    })
  );

  @Effect()
  resetPasswordUser$ = this.actions$.pipe(
    ofType<UserRestPasswordAction>(UserActionTypes.USER_RESET_PASSWORD),
    switchMap(({ payload }) => {
      this.store.dispatch(this.showActionLoadingDistpatcher);
      return this.userService.resetPasswordUser(payload.userName).pipe(
        map((response) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);
          if (response == true) {
            this.toastService.showSuccess(
              "User successfully has been reset password",
              `User`
            );
            return new UserRestPasswordSuccess({ response: response });
          } else {
            this.toastService.showDanger(
              "Sorry, We're having trouble. Please try again.",
              `User`
            );
            return new UserRestPasswordFailure({ error: "" });
          }
        }),
        catchError((error) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);
          this.toastService.showDanger(
            error.error.Message,
            "User Reset Password"
          );
          return of(new UserRestPasswordFailure(error));
        })
      );
    })
  );

  @Effect()
  loadRoleUser$ = this.actions$.pipe(
    ofType<UserRoleLoadAction>(UserActionTypes.USER_ROLE_LOAD),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showActionLoadingDistpatcher);
      return this.roleService.getRolesInUser(payload.user.UserId).pipe(
        map((response) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);

          const _userChange = cloneDeep(payload.user);
          _userChange.ListRoles = response;

          return new UserRoleLoadSuccess({
            user: _userChange,
            response: true,
          });
        }),
        catchError((error) => {
          this.store.dispatch(this.hideActionLoadingDistpatcher);
          this.toastService.showDanger(error.error.Message, "User Role");
          return of(new UserRoleLoadFailure(error));
        })
      );
    })
  );

  @Effect()
  addRoleUser$ = this.actions$.pipe(
    ofType<UserRoleAddAction>(UserActionTypes.USER_ROLE_ADD),
    switchMap(({ payload }) => {
      this.store.dispatch(this.showActionLoadingDistpatcher);
      return this.roleService
        .assignUserToRole({
          roleName: payload.roleName,
          userId: payload.user.UserId,
        })
        .pipe(
          map((response) => {
            this.store.dispatch(this.hideActionLoadingDistpatcher);
            if (response == true) {
              this.toastService.showSuccess(
                `User successfully has been add role: ${payload.roleName}`,
                `User`
              );

              const _userChange = cloneDeep(payload.user);
              _userChange.ListRoles.push(payload.roleName);

              return new UserRoleAddSuccess({
                user: _userChange,
                response: response,
              });
            } else {
              this.toastService.showDanger(
                "Sorry, We're having trouble. Please try again.",
                `User`
              );
              return new UserRoleAddFailure({ error: "" });
            }
          }),
          catchError((error) => {
            this.store.dispatch(this.hideActionLoadingDistpatcher);
            this.toastService.showDanger(error.error.Message, "User Role");
            return of(new UserRoleAddFailure(error));
          })
        );
    })
  );

  @Effect()
  removeRoleUser$ = this.actions$.pipe(
    ofType<UserRoleRemoveAction>(UserActionTypes.USER_ROLE_REMOVE),
    switchMap(({ payload }) => {
      this.store.dispatch(this.showActionLoadingDistpatcher);
      return this.roleService
        .removeUserFromRole({
          roleName: payload.roleName,
          userId: payload.user.UserId,
        })
        .pipe(
          map((response) => {
            this.store.dispatch(this.hideActionLoadingDistpatcher);
            if (response == true) {
              this.toastService.showSuccess(
                `User successfully has been remove role: ${payload.roleName}`,
                `User`
              );

              const _userChange = cloneDeep(payload.user);
              const _index = _userChange.ListRoles.indexOf(payload.roleName);
              _userChange.ListRoles.splice(_index, 1);

              return new UserRoleRemoveSuccess({
                user: _userChange,
                response: response,
              });
            } else {
              this.toastService.showDanger(
                "Sorry, We're having trouble. Please try again.",
                `User`
              );
              return new UserRoleRemoveFailure({ error: "" });
            }
          }),
          catchError((error) => {
            this.store.dispatch(this.hideActionLoadingDistpatcher);
            this.toastService.showDanger(
              error.error.Message || error,
              "User Role"
            );
            return of(new UserRoleRemoveFailure(error));
          })
        );
    })
  );

  @Effect()
  getTotalAllUser$ = this.actions$.pipe(
    ofType<UserAllTotalAction>(UserActionTypes.GET_TOTAL_ALL_USER),
    switchMap(({ payload }) => this.userService.getTotalAllUser(payload)),
    map((response: number) => new UserAllTotalSuccessAction(response)),
    catchError((error) => {
      this.toastService.showDanger(
        error.error.Message || error,
        "Total All User"
      );
      return of(new UserAllTotalFailureAction(error));
    })
  );

  @Effect()
  getTotalActiveUser$ = this.actions$.pipe(
    ofType<UserActiveTotalAction>(UserActionTypes.GET_TOTAL_ACTIVE_USER),
    switchMap(({ payload }) => this.userService.getTotalActiveUser(payload)),
    map((response: number) => new UserActiveTotalSuccessAction(response)),
    catchError((error) => {
      this.toastService.showDanger(
        error.error.Message || error,
        "Total Active User"
      );
      return of(new UserActiveTotalFailureAction(error));
    })
  );

  @Effect()
  getTotalInActiveUser$ = this.actions$.pipe(
    ofType<UserInActiveTotalAction>(UserActionTypes.GET_TOTAL_INACTIVE_USER),
    switchMap(({ payload }) => this.userService.getTotalInActiveUser(payload)),
    map((response: number) => new UserInActiveTotalSuccessAction(response)),
    catchError((error) => {
      this.toastService.showDanger(
        error.error.Message || error,
        "Total InActive User"
      );
      return of(new UserInActiveTotalFailureAction(error));
    })
  );

  @Effect()
  getTotalLockedUser$ = this.actions$.pipe(
    ofType<UserLockedTotalAction>(UserActionTypes.GET_TOTAL_LOCKED_USER),
    switchMap(({ payload }) => this.userService.getTotalLockedUser(payload)),
    map((response: number) => new UserLockedTotalSuccessAction(response)),
    catchError((error) => {
      this.toastService.showDanger(
        error.error.Message || error,
        "Total Locked User"
      );
      return of(new UserLockedTotalFailureAction(error));
    })
  );

  @Effect()
  fetchStores$ = this.actions$.pipe(
    ofType<FetchAllStoresAction>(UserActionTypes.FETCH_ALL_STORES),
    mergeMap(() => {
      return this.userService.fetchAllStores();
    }),
    map((response) => {
      return new FetchAllStoresSuccessAction({ stores: response });
    }),
    catchError((error, caught) => {
      this.store.dispatch(new FetchAllStoresSuccessAction({ stores: null }));

      return caught;
    })
  );

  @Effect()
  fetchUserStores$ = this.actions$.pipe(
    ofType<FetchUserStoresAction>(UserActionTypes.FETCH_USER_STORES),
    mergeMap(({ payload }) => {
      return this.userService.fetchStoresAssignedToUser(payload.userId);
    }),
    map((res) => {
      return new FetchUserStoresSuccessAction({ res });
    }),
    catchError((error, caught) => {
      this.store.dispatch(new FetchUserStoresSuccessAction({ res: [] }));

      return caught;
    })
  );

  @Effect()
  loadStoreDetails$ = this.actions$.pipe(
    ofType<FetchStoreDetailsAction>(UserActionTypes.FETCH_STORE_DETAILS),
    switchMap(({ payload }) => {
      return this.userService.fetchStoreDetails(payload.storeId);
    }),
    map((response) => {
      return new FetchStoreDetailsSuccessAction({ store: response });
    }),
    catchError((error, caught) => {
      this.store.dispatch(new FetchStoreDetailsSuccessAction({ store: null }));
      return caught;
    })
  );

  @Effect()
  addUserStore$ = this.actions$.pipe(
    ofType<AddUserStoreAction>(UserActionTypes.ADD_USER_STORE),
    switchMap(({ payload }) => {
      return this.userService.addUserStore(payload.data);
    }),
    map((res) => {
      if (res) {
        this.toastService.showSuccess("Assigned to store successfully");
        return new AddUserStoreSuccessAction({ isSuccess: true });
      }

      return new AddUserStoreSuccessAction({ isSuccess: false });
    }),
    catchError((error, caught) => {
      this.store.dispatch(new AddUserStoreSuccessAction({ isSuccess: false }));
      this.toastService.showDanger(
        error.error.Message || error,
        "Add Problem!"
      );

      return caught;
    }),
    finalize(() => console.log("add finalize() block executed"))
  );

  @Effect()
  updateUserStore$ = this.actions$.pipe(
    ofType<UpdateUserStoreAction>(UserActionTypes.UPDATE_USER_STORE),
    switchMap(({ payload }) => {
      return this.userService.updateUserStore(payload.data);
    }),
    map((res) => {
      if (res) {
        this.toastService.showSuccess("Update assigned store successfully");
        return new UpdateUserStoreSuccessAction({ isSuccess: true });
      }

      return new UpdateUserStoreSuccessAction({ isSuccess: false });
    }),
    catchError((error, caught) => {
      this.store.dispatch(
        new UpdateUserStoreSuccessAction({ isSuccess: false })
      );

      this.toastService.showDanger(
        error.error.Message || error,
        "Update Problem!"
      );
      return caught;
    }),
    finalize(() => console.log("update finalize() block executed"))
  );

  @Effect()
  removeUserStore$ = this.actions$.pipe(
    ofType<RemoveUserStoreAction>(UserActionTypes.REMOVE_USER_STORE),
    switchMap(({ payload }) => {
      return this.userService
        .removeUserStore(payload.userId, payload.storeId)
        .pipe(
          map((res) => {
            if (res) {
              this.toastService.showSuccess("Unassigned store successfully");
              return new RemoveUserStoreSuccessAction({ isSuccess: true });
            }

            return new RemoveUserStoreSuccessAction({ isSuccess: false });
          }),
          catchError((error, caught) => {
            this.store.dispatch(
              new RemoveUserStoreSuccessAction({ isSuccess: false })
            );

            return caught;
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private roleService: RoleService,
    private toastService: ToastService
  ) {}
}
