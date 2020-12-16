import { Action } from '@ngrx/store';

export enum LoadingActionTypes {
  LOADING = "[LOADING] Loading",
  ADD_LOADING = "[LOADING] Add Loading",
  REMOVE_LOADING = "[LOADING] Remove Loading",
}

export class ToggleLoadingAction implements Action {
  readonly type = LoadingActionTypes.LOADING;
  constructor(public payload: { currentAction: string }) {}
}

export class AddLoadingAction implements Action {
  readonly type = LoadingActionTypes.ADD_LOADING;
  constructor(public payload: { currentAction: string }) {}
}

export class RemoveLoadingAction implements Action {
  readonly type = LoadingActionTypes.REMOVE_LOADING;
  constructor(public payload: { currentAction: string }) {}
}

export type LoadingActions = ToggleLoadingAction | AddLoadingAction | RemoveLoadingAction;
