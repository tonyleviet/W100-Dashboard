import { Action } from "@ngrx/store";
import { QueryParamsModel } from "@core-ui/_base/crud/models/query-models/query-params.model";
import {
  UserModel,
  ChangePasswordModel,
  IAddUserStoreBody,
  IStoreAssignedUser,
  IService,
  IStore,
} from "../_models/user.model";
import { ServicesType, ServicesModel } from '../_models/services.model';


export enum UserActionTypes {
  LOAD_USERS = "[USERS] Load Users",
  LOAD_USERS_SUCCESS = "[USERS] Load Users Success",
  LOAD_USERS_FAILURE = "[USERS] Load Users Failure",
  USERS_PAGE_TOGGLE_LOADING = "[USERS] Users Page Toggle Loading",
  USERS_ACTION_TOGGLE_LOADING = "[USERS] Users Action Toggle Loading",
  USER_CREATED = "[USER] User Create",
  USER_CREATED_SUCCESS = "[USER] User Create Success",
  USER_CREATE_FAILURE = "[USER] User Create Failure",
  LOAD_USER = "[USERS] Load User",
  LOAD_USER_SUCCESS = "[USERS] Load User Success",
  LOAD_USER_FAILURE = "[USERS] Load User Failure",
  USER_UPDATE = "[USER] User Update",
  USER_UPDATE_SUCCESS = "[USER] User Update Success",
  USER_UPDATE_FAILURE = "[USER] User Update Failure",
  USER_CHANGE_PASSWORD = "[USER] Change Password",
  USER_CHANGE_PASSWORD_SUCCESS = "[USER] Change Password Success",
  USER_CHANGE_PASSWORD_FAILURE = "[USER] Change Password Failure",
  USER_RESET_PASSWORD = "[USER] Reset Password",
  USER_RESET_PASSWORD_SUCCESS = "[USER] Reset Password Success",
  USER_RESET_PASSWORD_FAILURE = "[USER] Reset Password Failure",

  USER_ROLE_LOAD = "[USER] Role Load",
  USER_ROLE_LOAD_SUCCESS = "[USER] Role Load Success",
  USER_ROLE_LOAD_FAILURE = "[USER] Role Load Failure",
  USER_ROLE_ADD = "[USER] Role Add",
  USER_ROLE_ADD_SUCCESS = "[USER] Role Add Success",
  USER_ROLE_ADD_FAILURE = "[USER] Role Add Failure",
  USER_ROLE_REMOVE = "[USER] Role Remove",
  USER_ROLE_REMOVE_SUCCESS = "[USER] Role Remove Success",
  USER_ROLE_REMOVE_FAILURE = "[USER] Role Remove Failure",
  USER_CLEAR = "[USER] Clear Response and Error",

  GET_TOTAL_ALL_USER = "[USER] Get total all User",
  GET_TOTAL_ALL_USER_SUCCESS = "[USER] Get total all User Success",
  GET_TOTAL_ALL_USER_FAILURE = "[USER] Get total all User Failure",

  GET_TOTAL_ACTIVE_USER = "[USER] Get total Active User",
  GET_TOTAL_ACTIVE_USER_SUCCESS = "[USER] Get total Active User Success",
  GET_TOTAL_ACTIVE_USER_FAILURE = "[USER] Get total Active User Failure",

  GET_TOTAL_INACTIVE_USER = "[USER] Get total InActive User",
  GET_TOTAL_INACTIVE_USER_SUCCESS = "[USER] Get total InActive User Success",
  GET_TOTAL_INACTIVE_USER_FAILURE = "[USER] Get total InActive User Failure",

  GET_TOTAL_LOCKED_USER = "[USER] Get total Locked User",
  GET_TOTAL_LOCKED_USER_SUCCESS = "[USER] Get total Locked User Success",
  GET_TOTAL_LOCKED_USER_FAILURE = "[USER] Get total Locked User Failure",

  // User store
  FETCH_ALL_STORES = "[USER] Fetch All Stores",
  FETCH_ALL_STORES_SUCCESS = "[USER] Fetch All Stores Success",

  FETCH_STORE_DETAILS = "[STORE DETAILS] Fetch Store Details",
  FETCH_STORE_DETAILS_SUCCESS = "[STORE DETAILS] Fetch Store Details Success",

  FETCH_USER_STORES = "[USER STORE] Fetch User Stores",
  FETCH_USER_STORES_SUCCESS = "[USER STORE] Fetch User Stores Success",

  ADD_USER_STORE = "[USER STORE] Add User To Store",
  ADD_USER_STORE_SUCCESS = "[USER STORE] Add User To Store Success",

  UPDATE_USER_STORE = "[USER STORE] Update User Store",
  UPDATE_USER_STORE_SUCCESS = "[USER STORE] Update User Store Success",

  REMOVE_USER_STORE = "[USER STORE] Remove User Store",
  REMOVE_USER_STORE_SUCCESS = "[USER STORE] Remove User Store Success",

  FETCH_ALL_SERVICE = '[USER STORE] Fetch all Services',
  SAVE_ALL_SERVICE = '[USER STORE] Save all Services',
}

export class UserClearAction implements Action {
  readonly type = UserActionTypes.USER_CLEAR;

  constructor(public payload: any) {}
}

export class LoadUsersAction implements Action {
  readonly type = UserActionTypes.LOAD_USERS;

  constructor(public payload: { page: QueryParamsModel; sortStatus: string }) {}
}

export class LoadUserSuccessAction implements Action {
  readonly type = UserActionTypes.LOAD_USERS_SUCCESS;

  constructor(
    public payload: {
      users: UserModel[];
      totalCount: number;
      page: QueryParamsModel;
    }
  ) {}
}

export class LoadUserFailureAction implements Action {
  readonly type = UserActionTypes.LOAD_USERS_FAILURE;

  constructor(public payload: any) {}
}

export class UsersPageToggleLoading implements Action {
  readonly type = UserActionTypes.USERS_PAGE_TOGGLE_LOADING;

  constructor(public payload: { isLoading: boolean }) {}
}

export class UsersActionToggleLoading implements Action {
  readonly type = UserActionTypes.USERS_ACTION_TOGGLE_LOADING;

  constructor(public payload: { isLoading: boolean }) {}
}

export class UserCreatedAction implements Action {
  readonly type = UserActionTypes.USER_CREATED;
  constructor(public payload: { user: UserModel }) {}
}

export class UserCreateSuccess implements Action {
  readonly type = UserActionTypes.USER_CREATED_SUCCESS;
  constructor(public payload: { response: string }) {}
}

export class UserCreateFailure implements Action {
  readonly type = UserActionTypes.USER_CREATE_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class LoadUserAction implements Action {
  readonly type = UserActionTypes.LOAD_USER;

  constructor(public payload: { email: string }) {}
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USER_SUCCESS;
  constructor(public payload: { user: UserModel; response: any }) {}
}

export class LoadUserFailure implements Action {
  readonly type = UserActionTypes.LOAD_USER_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class UserUpdateAction implements Action {
  readonly type = UserActionTypes.USER_UPDATE;

  constructor(
    public payload: {
      user: UserModel;
    }
  ) {}
}

export class UserUpdateSuccess implements Action {
  readonly type = UserActionTypes.USER_UPDATE_SUCCESS;
  constructor(
    public payload: {
      user: UserModel;
      response: string;
    }
  ) {}
}

export class UserUpdateFailure implements Action {
  readonly type = UserActionTypes.USER_UPDATE_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class UserChangePasswordAction implements Action {
  readonly type = UserActionTypes.USER_CHANGE_PASSWORD;

  constructor(public payload: { changePassword: ChangePasswordModel }) {}
}

export class UserChangePasswordSuccess implements Action {
  readonly type = UserActionTypes.USER_CHANGE_PASSWORD_SUCCESS;

  constructor(public payload: { response: any }) {}
}

export class UserChangePasswordFailure implements Action {
  readonly type = UserActionTypes.USER_CHANGE_PASSWORD_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class UserRestPasswordAction implements Action {
  readonly type = UserActionTypes.USER_RESET_PASSWORD;

  constructor(public payload: { userName: string }) {}
}

export class UserRestPasswordSuccess implements Action {
  readonly type = UserActionTypes.USER_RESET_PASSWORD_SUCCESS;

  constructor(public payload: { response: any }) {}
}

export class UserRestPasswordFailure implements Action {
  readonly type = UserActionTypes.USER_RESET_PASSWORD_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class UserRoleLoadAction implements Action {
  readonly type = UserActionTypes.USER_ROLE_LOAD;

  constructor(
    public payload: {
      user: UserModel;
    }
  ) {}
}

export class UserRoleLoadSuccess implements Action {
  readonly type = UserActionTypes.USER_ROLE_LOAD_SUCCESS;

  constructor(
    public payload: {
      user: UserModel;
      response: any;
    }
  ) {}
}

export class UserRoleLoadFailure implements Action {
  readonly type = UserActionTypes.USER_ROLE_LOAD_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class UserRoleAddAction implements Action {
  readonly type = UserActionTypes.USER_ROLE_ADD;

  constructor(
    public payload: {
      user: UserModel;
      roleName: string;
    }
  ) {}
}

export class UserRoleAddSuccess implements Action {
  readonly type = UserActionTypes.USER_ROLE_ADD_SUCCESS;

  constructor(
    public payload: {
      user: UserModel;
      response: any;
    }
  ) {}
}

export class UserRoleAddFailure implements Action {
  readonly type = UserActionTypes.USER_ROLE_ADD_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class UserRoleRemoveAction implements Action {
  readonly type = UserActionTypes.USER_ROLE_REMOVE;

  constructor(
    public payload: {
      user: UserModel;
      roleName: string;
    }
  ) {}
}

export class UserRoleRemoveSuccess implements Action {
  readonly type = UserActionTypes.USER_ROLE_REMOVE_SUCCESS;

  constructor(
    public payload: {
      user: UserModel;
      response: any;
    }
  ) {}
}

export class UserRoleRemoveFailure implements Action {
  readonly type = UserActionTypes.USER_ROLE_REMOVE_FAILURE;

  constructor(public payload: { error: any }) {}
}

// GET_TOTAL_ALL_USER
export class UserAllTotalAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_ALL_USER;
  constructor(public payload: any) {}
}
export class UserAllTotalSuccessAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_ALL_USER_SUCCESS;
  constructor(public payload: number) {}
}
export class UserAllTotalFailureAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_ALL_USER_FAILURE;
  constructor(public payload: any) {}
}
// GET_TOTAL_ACTIVE_USER
export class UserActiveTotalAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_ACTIVE_USER;
  constructor(public payload: any) {}
}
export class UserActiveTotalSuccessAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_ACTIVE_USER_SUCCESS;
  constructor(public payload: number) {}
}
export class UserActiveTotalFailureAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_ACTIVE_USER_FAILURE;
  constructor(public payload: any) {}
}
// GET_TOTAL_INACTIVE_USER
export class UserInActiveTotalAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_INACTIVE_USER;
  constructor(public payload: any) {}
}
export class UserInActiveTotalSuccessAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_INACTIVE_USER_SUCCESS;
  constructor(public payload: number) {}
}
export class UserInActiveTotalFailureAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_INACTIVE_USER_FAILURE;
  constructor(public payload: any) {}
}
// GET_TOTAL_LOCKED_USER
export class UserLockedTotalAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_LOCKED_USER;
  constructor(public payload: any) {}
}
export class UserLockedTotalSuccessAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_LOCKED_USER_SUCCESS;
  constructor(public payload: number) {}
}
export class UserLockedTotalFailureAction implements Action {
  readonly type = UserActionTypes.GET_TOTAL_LOCKED_USER_FAILURE;
  constructor(public payload: any) {}
}

// User store
export class FetchAllStoresAction implements Action {
  readonly type = UserActionTypes.FETCH_ALL_STORES;
  constructor() {}
}

export class FetchAllStoresSuccessAction implements Action {
  readonly type = UserActionTypes.FETCH_ALL_STORES_SUCCESS;
  constructor(public payload: { stores: IStore[] }) {}
}

export class FetchStoreDetailsAction implements Action {
  readonly type = UserActionTypes.FETCH_STORE_DETAILS;
  constructor(public payload: { storeId: number }) {}
}

export class FetchStoreDetailsSuccessAction implements Action {
  readonly type = UserActionTypes.FETCH_STORE_DETAILS_SUCCESS;
  constructor(public payload: { store: IStore }) {}
}

export class FetchUserStoresAction implements Action {
  readonly type = UserActionTypes.FETCH_USER_STORES;
  constructor(public payload: { userId: string }) {}
}

export class FetchUserStoresSuccessAction implements Action {
  readonly type = UserActionTypes.FETCH_USER_STORES_SUCCESS;
  constructor(public payload: { res: IStoreAssignedUser[] }) {} // TODO
}

export class AddUserStoreAction implements Action {
  readonly type = UserActionTypes.ADD_USER_STORE;
  constructor(public payload: { data: IAddUserStoreBody }) {}
}

export class AddUserStoreSuccessAction implements Action {
  readonly type = UserActionTypes.ADD_USER_STORE_SUCCESS;
  constructor(public payload: { isSuccess: boolean }) {}
}

export class UpdateUserStoreAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER_STORE;
  constructor(public payload: { data: IAddUserStoreBody }) {}
}

export class UpdateUserStoreSuccessAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER_STORE_SUCCESS;
  constructor(public payload: { isSuccess: boolean }) {}
}

export class RemoveUserStoreAction implements Action {
  readonly type = UserActionTypes.REMOVE_USER_STORE;
  constructor(public payload: { userId: string; storeId: number }) {}
}

export class RemoveUserStoreSuccessAction implements Action {
  readonly type = UserActionTypes.REMOVE_USER_STORE_SUCCESS;
  constructor(public payload: { isSuccess: boolean }) {}
}

export class FetchAllServicesAction implements Action {
  readonly type = UserActionTypes.FETCH_ALL_SERVICE;
  constructor(public serviceType: ServicesType = null) {}
}
export class SaveAllServicesAction implements Action {
  readonly type = UserActionTypes.SAVE_ALL_SERVICE;
  constructor(public payload: ServicesModel[]) {};
}

export type UserActions =
  | UserClearAction
  | UsersPageToggleLoading
  | UsersActionToggleLoading
  | LoadUsersAction
  | LoadUserSuccessAction
  | LoadUserFailureAction
  | UserCreatedAction
  | UserCreateSuccess
  | UserCreateFailure
  | LoadUserAction
  | LoadUserSuccess
  | LoadUserFailure
  | UserUpdateAction
  | UserUpdateSuccess
  | UserUpdateFailure
  | UserChangePasswordAction
  | UserChangePasswordSuccess
  | UserChangePasswordFailure
  | UserRestPasswordAction
  | UserRestPasswordSuccess
  | UserRestPasswordFailure
  | UserRoleLoadAction
  | UserRoleLoadSuccess
  | UserRoleLoadFailure
  | UserRoleAddAction
  | UserRoleAddSuccess
  | UserRoleAddFailure
  | UserRoleRemoveAction
  | UserRoleRemoveSuccess
  | UserRoleRemoveFailure
  | UserAllTotalAction
  | UserAllTotalSuccessAction
  | UserAllTotalFailureAction
  | UserActiveTotalAction
  | UserActiveTotalSuccessAction
  | UserActiveTotalFailureAction
  | UserInActiveTotalAction
  | UserInActiveTotalSuccessAction
  | UserInActiveTotalFailureAction
  | UserLockedTotalAction
  | UserLockedTotalSuccessAction
  | UserLockedTotalFailureAction
  | FetchAllStoresAction
  | FetchAllStoresSuccessAction
  | FetchUserStoresAction
  | FetchUserStoresSuccessAction
  | FetchStoreDetailsAction
  | FetchStoreDetailsSuccessAction
  | AddUserStoreAction
  | AddUserStoreSuccessAction
  | UpdateUserStoreAction
  | UpdateUserStoreSuccessAction
  | RemoveUserStoreAction
  | RemoveUserStoreSuccessAction
  | FetchAllServicesAction
  | SaveAllServicesAction;
