import { Action } from "@ngrx/store";
import { UserModel } from "@app/modules/user-management/_models/user.model";

export enum UserRoleActionTypes {
  LOAD_USERS_ROLE = "[USERS ROLE] Load Users Role",
  LOAD_USERS_ROLE_SUCCESS = "[USERS ROLE] Load Users Success",
  LOAD_USERS_ROLE_FAILURE = "[USERS ROLE] Load Users Failure",
  USERS_ROLE_PAGE_TOGGLE_LOADING = "[USERS ROLE] Users Page Toggle Loading",
  USERS_ROLE_ACTION_TOGGLE_LOADING = "[USERS ROLE] Users Action Toggle Loading",

  // Auto Complete
  SEARCH_USERS = "[SEARCH USERS] Search Users",
  SEARCH_USERS_ACTION_TOGGLE_LOADING = "[SEARCH USERS] Search Users Action Toggle Loading",
  SEARCH_USERS_SUCCESS = "[SEARCH USERS] Search Users Success",

  ASSIGN_USER_TO_ROLE = "[USER ROLE] Assign User To Role",
  ASSIGN_USER_TO_ROLE_SUCCESS = "[USER ROLE] Assign User To Role Success",
  REMOVE_USER_TO_ROLE = "[USER ROLE] Remove User From Role",
  REMOVE_USER_TO_ROLE_SUCCESS = "[USER ROLE] Remove User From Role Success"
}

export class LoadUsersRoleAction implements Action {
  readonly type = UserRoleActionTypes.LOAD_USERS_ROLE;

  constructor(public payload: { roleName: string }) {}
}

export class LoadUsersRoleSuccessAction implements Action {
  readonly type = UserRoleActionTypes.LOAD_USERS_ROLE_SUCCESS;

  constructor(public payload: { users: UserModel[]; totalCount: number }) {}
}

export class LoadUsersRoleFailureAction implements Action {
  readonly type = UserRoleActionTypes.LOAD_USERS_ROLE_FAILURE;

  constructor(public payload: any) {}
}

export class UsersRolePageToggleLoading implements Action {
  readonly type = UserRoleActionTypes.USERS_ROLE_PAGE_TOGGLE_LOADING;

  constructor(public payload: { isLoading: boolean }) {}
}

export class UsersRoleActionToggleLoading implements Action {
  readonly type = UserRoleActionTypes.USERS_ROLE_ACTION_TOGGLE_LOADING;

  constructor(public payload: { isLoading: boolean }) {}
}

// Auto Complete
export class SearchUsersAction implements Action {
  readonly type = UserRoleActionTypes.SEARCH_USERS;

  constructor(public payload: { keyword: string }) {}
}

export class SearchUsersActionToggleLoading implements Action {
  readonly type = UserRoleActionTypes.SEARCH_USERS_ACTION_TOGGLE_LOADING;

  constructor(public payload: { isACLoading: boolean }) {}
}

export class SearchUserSuccessAction implements Action {
  readonly type = UserRoleActionTypes.SEARCH_USERS_SUCCESS;

  constructor(public payload: { users: UserModel[] }) {}
}

export class AssignUserToRoleAction implements Action {
  readonly type = UserRoleActionTypes.ASSIGN_USER_TO_ROLE;

  constructor(public payload: { roleName: string, userId: string }) {}
}

export class AssignUserToRoleSuccess implements Action {
  readonly type = UserRoleActionTypes.ASSIGN_USER_TO_ROLE_SUCCESS;

  constructor(public payload: any) {}
}


export class RemoveUserFromRoleAction implements Action {
  readonly type = UserRoleActionTypes.REMOVE_USER_TO_ROLE;

  constructor(public payload: { roleName: string, userId: string }) {}
}

export class RemoveUserFromRoleSuccess implements Action {
  readonly type = UserRoleActionTypes.REMOVE_USER_TO_ROLE_SUCCESS;

  constructor(public payload: any) {}
}

export type UserRoleActions =
  | LoadUsersRoleAction
  | LoadUsersRoleSuccessAction
  | LoadUsersRoleFailureAction
  | UsersRolePageToggleLoading
  | UsersRoleActionToggleLoading
  // Auto Complete
  | SearchUsersAction
  | SearchUsersActionToggleLoading
  | SearchUserSuccessAction
  //
  | AssignUserToRoleAction
  | AssignUserToRoleSuccess
  | RemoveUserFromRoleAction
  | RemoveUserFromRoleSuccess;
