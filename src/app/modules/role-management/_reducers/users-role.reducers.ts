import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { filter } from "lodash";
import { UserModel } from "@app/modules/user-management/_models/user.model";
import { createFeatureSelector } from "@ngrx/store";
import {
  UserRoleActions,
  UserRoleActionTypes
} from "../_actions/user-role.actions";

export interface UsersRoleState extends EntityState<UserModel> {
  listLoading: boolean;
  actionsLoading: boolean;
  isACLoading: boolean;
  totalCount: number;
  showInitWaitingMessage: boolean;
  usersAC: UserModel[];
}

export const adapter: EntityAdapter<UserModel> = createEntityAdapter<UserModel>({
	selectId: (user: UserModel) => user.Email
});

const initialUsersState: UsersRoleState = adapter.getInitialState({
  listLoading: false,
  actionsLoading: false,
  isACLoading: false,
  totalCount: 0,
  showInitWaitingMessage: true,
  usersAC: []
});

export function usersRoleReducers(
  state = initialUsersState,
  action: UserRoleActions
): UsersRoleState {
  switch (action.type) {
    case UserRoleActionTypes.USERS_ROLE_PAGE_TOGGLE_LOADING:
      return {
        ...state,
        listLoading: action.payload.isLoading
      };
    case UserRoleActionTypes.USERS_ROLE_ACTION_TOGGLE_LOADING:
      return {
        ...state,
        actionsLoading: action.payload.isLoading
      };
    case UserRoleActionTypes.LOAD_USERS_ROLE_SUCCESS:
      return adapter.addMany(action.payload.users, {
        ...initialUsersState,
        totalCount: action.payload.totalCount,
        listLoading: false,
        showInitWaitingMessage: false
      });

    // Auto Complete
    case UserRoleActionTypes.SEARCH_USERS_ACTION_TOGGLE_LOADING:
      return {
        ...state,
        isACLoading: action.payload.isACLoading
      };

    case UserRoleActionTypes.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        usersAC: action.payload.users,
        isACLoading: false
      };

    case UserRoleActionTypes.ASSIGN_USER_TO_ROLE_SUCCESS:
      return {
        ...state,
        isACLoading: false
      };

    case UserRoleActionTypes.REMOVE_USER_TO_ROLE_SUCCESS:
      return {
        ...state,
        listLoading: false
      };

    default:
      return state;
  }
}

export const getUserRoleState = createFeatureSelector<UsersRoleState>(
  "users-role"
);
