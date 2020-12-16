import { Action } from '@ngrx/store';
import { RoleModel } from '../_models/role.model';
import { UserModel } from '@app/modules/user-management/_models/user.model';

export enum RoleActionTypes {
	LOAD_ROLES = '[ROLES] Load Roles',
	LOAD_ROLES_SUCCESS = '[ROLES] Load Roles Success',
	LOAD_ROLES_FAILURE = '[ROLES] Load Roles Failure',
	ROLES_PAGE_TOGGLE_LOADING = '[ROLES] Roles Page Toggle Loading',
	ROLES_ACTION_TOGGLE_LOADING = '[ROLES] Roles Action Toggle Loading',
	FILTER_ROLES = '[ROLES] Filter Roles',
	ROLE_ON_SERVER_CREATED = '[ADD ROLE] Role On Server Created',
	ROLE_CREATED = '[ADD ROLE] Role Created',

	LOAD_USERS_IN_ROLE = '[USERS ROLE] Load Users In Role',
	LOAD_USERS_ROLE_SUCCESS = '[USERS ROLE] Load Users Success',
	LOAD_USERS_ROLE_FAILURE = '[USERS ROLE] Load Users Failure'
}

export class LoadRolesAction implements Action {
	readonly type = RoleActionTypes.LOAD_ROLES;

	constructor() {}
}

export class LoadRoleSuccessAction implements Action {
	readonly type = RoleActionTypes.LOAD_ROLES_SUCCESS;

	constructor(public payload: { roles: RoleModel[] }) {}
}

export class LoadRoleFailureAction implements Action {
	readonly type = RoleActionTypes.LOAD_ROLES_FAILURE;

	constructor(public payload: any) {}
}

export class RolesPageToggleLoading implements Action {
	readonly type = RoleActionTypes.ROLES_PAGE_TOGGLE_LOADING;

	constructor(public payload: { isLoading: boolean }) {}
}

export class RolesActionToggleLoading implements Action {
	readonly type = RoleActionTypes.ROLES_ACTION_TOGGLE_LOADING;

	constructor(public payload: { isLoading: boolean }) {}
}

export class FilterRolesAction implements Action {
	readonly type = RoleActionTypes.FILTER_ROLES;

	constructor(public payload: { keyword: string }) {}
}

export class RoleOnServerCreated implements Action {
	readonly type = RoleActionTypes.ROLE_ON_SERVER_CREATED;

	constructor(public payload: { role: RoleModel }) {}
}

export class RoleCreated implements Action {
	readonly type = RoleActionTypes.ROLE_CREATED;

	constructor(public payload: { created: boolean }) {}
}

export type RoleActions = LoadRolesAction
| LoadRoleSuccessAction
| LoadRoleFailureAction
| RolesActionToggleLoading
| RolesPageToggleLoading
| FilterRolesAction
| RoleOnServerCreated
| RoleCreated