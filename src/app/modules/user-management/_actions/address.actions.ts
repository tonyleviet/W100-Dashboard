import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { QueryParamsModel } from '@core-ui/_base/crud/models/query-models/query-params.model';
import { AddressModel } from '../_models/address.model';

export enum AddressActionTypes {
	ADDRESS_PAGE_TOGGLE_LOADING = '[ADDRESS] Address Page Toggle Loading',
  ADDRESS_ACTION_TOGGLE_LOADING = '[ADDRESS] Address Action Toggle Loading',
  ADDRESS_LOAD = "[ADDRESS] Load list Address",
  ADDRESS_LOAD_SUCCESS = "[ADDRESS] Load list Address Success",
  ADDRESS_LOAD_FAILURE = "[ADDRESS] Load list Address Failure",
  ADDRESS_CREATE = "[ADDRESS] Address Create",
  ADDRESS_CREATED_SUCCESS = '[ADDRESS] Address Create Success',
  ADDRESS_CREATE_FAILURE = '[ADDRESS] Address Create Failure',
  ADDRESS_UPDATE = '[ADDRESS] Address Update',
  ADDRESS_UPDATE_SUCCESS = '[ADDRESS] Address Update Success',
  ADDRESS_UPDATE_FAILURE = '[ADDRESS] Address Update Failure',
  ADDRESS_DELETE = '[ADDRESS] Address Delete',
  ADDRESS_DELETE_SUCCESS = '[ADDRESS] Address Delete Success',
  ADDRESS_DELETE_FAILURE = '[ADDRESS] Address Delete Failure',
}

export class AddressPageToggleLoading implements Action {
	readonly type = AddressActionTypes.ADDRESS_PAGE_TOGGLE_LOADING;

	constructor(public payload: { isLoading: boolean }) {}
}

export class AddressActionToggleLoading implements Action {
	readonly type = AddressActionTypes.ADDRESS_ACTION_TOGGLE_LOADING;

	constructor(public payload: { isLoading: boolean }) {}
}

export class AddressLoadAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_LOAD;

  constructor(public payload: { userId: string }) {}
}

export class AddressLoadSuccessAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_LOAD_SUCCESS;

  constructor(public payload: { address: AddressModel[] }) {}
}

export class AddressLoadFailureAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_LOAD_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class AddressCreateAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_CREATE;

  constructor(public payload: {
    address: AddressModel
  }) {}
}

export class AddressCreateSuccessAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_CREATED_SUCCESS;

  constructor(public payload: {
    address: AddressModel,
    response: any
  }) {}
}

export class AddressCreateFailureAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_CREATE_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class AddressUpdateAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_UPDATE;

  constructor(public payload: {
    partial: Update<AddressModel>,
    address: AddressModel
  }) {}
}

export class AddressUpdateSuccessAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_UPDATE_SUCCESS;

  constructor(public payload: {
    partial: Update<AddressModel>,
    address: AddressModel,
    response: any
  }) {}
}

export class AddressUpdateFailureAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_UPDATE_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class AddressDeleteAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_DELETE;

  constructor(public payload: { contactId: number }) {}
}

export class AddressDeleteSuccessAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_DELETE_SUCCESS;

  constructor(public payload: { contactId: number, response: any }) {}
}

export class AddressDeleteFailureAction implements Action {
  readonly type = AddressActionTypes.ADDRESS_DELETE_FAILURE;

  constructor(public payload: { error: any }) {}
}

export type AddressActions = AddressPageToggleLoading | AddressActionToggleLoading
| AddressLoadAction | AddressLoadSuccessAction | AddressLoadFailureAction
| AddressCreateAction | AddressCreateSuccessAction | AddressCreateFailureAction
| AddressUpdateAction | AddressUpdateSuccessAction | AddressUpdateFailureAction
| AddressDeleteAction | AddressDeleteSuccessAction | AddressDeleteFailureAction
;

