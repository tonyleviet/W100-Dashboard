import { Action } from "@ngrx/store";
import { PermissionModel, PermissionMenuModel } from "../_models/permission.model";

export enum PermissionActionTypes {
  LOAD_PERMISSIONS = "[PERMISSIONS] Load Permissions",
  LOAD_PERMISSIONS_SUCCESS = "[PERMISSION] Load Permissions Success",
  LOAD_PERMISSIONS_FAILURE = "[PERMISSION] Load Permissions Failure",
  PERMISSION_PAGE_TOGGLE_LOADING = "[PERMISSION] Permission Page Toggle Loading",
  PERMISSION_ACTION_TOGGLE_LOADING = "[PERMISSION] Permission Action Toggle Loading",
  FILTER_PERMISSIONS = "[PERMISSION] Filter Permissions",

  DETECT_PERMISSION_TYPES = "[PERMISSION] Detect Permission Types",
  UPDATE_PERMISSION = "[PERMISSION] Update Permission",
  UPDATE_PERMISSION_SUCCESS = "[PERMISSION] Update Permission Success",
  UPDATE_PERMISSION_FAILURE = "[PERMISSION] Update Permission Failure",

  PERMISSION_MENU_TOGGLE_LOADING = '[PERMISSION] Permission Menu Toggle Loading',
  LOAD_PERMISSIONS_MENU = '[PERMISSIONS] Load Permissions Menu',
  SAVE_PERMISSIONS_MENU = '[PERMISSIONS] Save Permissions Menu',
}

export class LoadPermissionsAction implements Action {
  readonly type = PermissionActionTypes.LOAD_PERMISSIONS;

  constructor(public payload: { companyId: string }) {}
}

export class LoadPermissionSuccessAction implements Action {
  readonly type = PermissionActionTypes.LOAD_PERMISSIONS_SUCCESS;

  constructor(public payload: { permissions: PermissionModel[] }) {}
}

export class LoadPermissionFailureAction implements Action {
  readonly type = PermissionActionTypes.LOAD_PERMISSIONS_FAILURE;

  constructor(public payload: any) {}
}

export class PermissionPageToggleLoading implements Action {
  readonly type = PermissionActionTypes.PERMISSION_PAGE_TOGGLE_LOADING;

  constructor(public payload: { isLoading: boolean }) {}
}

export class PermissionActionToggleLoading implements Action {
  readonly type = PermissionActionTypes.PERMISSION_ACTION_TOGGLE_LOADING;

  constructor(public payload: { isLoading: boolean }) {}
}

export class FilterPermissionsAction implements Action {
  readonly type = PermissionActionTypes.FILTER_PERMISSIONS;

  constructor(public payload: { keyword: string }) {}
}

export class DetectPermissionTypesAction implements Action {
  readonly type = PermissionActionTypes.DETECT_PERMISSION_TYPES;

  constructor(public payload: { permission: PermissionModel }) {}
}

export class UpdatePermissionAction implements Action {
  readonly type = PermissionActionTypes.UPDATE_PERMISSION;

  constructor(public payload: { permissionId: string, data: PermissionModel }) {}
}

export class UpdatePermissionSuccessAction implements Action {
  readonly type = PermissionActionTypes.UPDATE_PERMISSION_SUCCESS;

  constructor(public payload: { updated: boolean }) {}
}

export class UpdatePermissionFailureAction implements Action {
  readonly type = PermissionActionTypes.UPDATE_PERMISSION_FAILURE;

  constructor(public payload: { updated: boolean }) {}
}

export class LoadPermissionMenuAction implements Action {
  readonly type = PermissionActionTypes.LOAD_PERMISSIONS_MENU;
  constructor(public payload: { companyId: string, userId: string, isRefesh?: boolean }) {
    if (!payload.isRefesh) payload.isRefesh = false;
  }
}
export class SavePermissionMenuAction implements Action {
  readonly type = PermissionActionTypes.SAVE_PERMISSIONS_MENU;
  constructor(public payload: {menu: PermissionMenuModel[], userPermission: PermissionMenuModel[]}) {}
}
export class PermissionMenuToggleLoading implements Action {
  readonly type = PermissionActionTypes.PERMISSION_MENU_TOGGLE_LOADING;
  constructor(public payload: boolean) {}
}

export type PermissionActions =
  | LoadPermissionsAction
  | LoadPermissionSuccessAction
  | LoadPermissionFailureAction
  | PermissionPageToggleLoading
  | PermissionActionToggleLoading
  | FilterPermissionsAction
  | DetectPermissionTypesAction
  | UpdatePermissionAction
  | UpdatePermissionSuccessAction
  | UpdatePermissionFailureAction
  | LoadPermissionMenuAction
  | SavePermissionMenuAction
  | PermissionMenuToggleLoading
;
