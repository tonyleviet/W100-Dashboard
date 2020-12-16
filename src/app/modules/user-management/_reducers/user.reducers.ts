import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { UserActions, UserActionTypes } from "../_actions/user.actions";
import {
  UserModel,
  IStore,
  IStoreAssignedUser,
  IService,
} from "../_models/user.model";
import { QueryParamsModel } from "@app/core-ui/_base/crud";
import { createFeatureSelector } from "@ngrx/store";
import { Numeric } from "d3";
import { ServicesType, ServicesModel } from '../_models/services.model';


export interface UsersState extends EntityState<UserModel> {
  listLoading: boolean;
  actionsLoading: boolean;
  totalCount: number;
  lastQuery: QueryParamsModel;
  showInitWaitingMessage: boolean;
  selectUser: UserModel;
  response: any;
  error: any;
  totalAll: number;
  totalActive: number;
  totalInActive: number;
  totalLocked: number;
  listStores?: IStore[];
  listServices?: IService[];
  listStoreAssigned?: IStoreAssignedUser[];
  assignStoreAction?: boolean;
  storeDetails?: IStore;
}

export const adapter: EntityAdapter<UserModel> = createEntityAdapter<UserModel>(
  {
    selectId: (user: UserModel) => user.UserId
  }
);

const initialUsersState: UsersState = adapter.getInitialState({
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  lastQuery: new QueryParamsModel({}),
  showInitWaitingMessage: true,
  lastCreatedUserEmail: undefined,
  selectUser: new UserModel(),
  response: null,
  error: null,
  totalAll: 0,
  totalActive: 0,
  totalInActive: 0,
  totalLocked: 0,
  assignStoreAction: null,
  listServices: [],
});

export function usersReducer(
  state = initialUsersState,
  action: UserActions
): UsersState {
  switch (action.type) {
    case UserActionTypes.USERS_PAGE_TOGGLE_LOADING:
      return {
        ...state,
        listLoading: action.payload.isLoading,
      };
    case UserActionTypes.USERS_ACTION_TOGGLE_LOADING:
      return {
        ...state,
        actionsLoading: action.payload.isLoading,
      };
    case UserActionTypes.LOAD_USERS:
      return adapter.removeAll({
        ...state,
        listLoading: true,
        showInitWaitingMessage: true,
      });
    case UserActionTypes.LOAD_USERS_SUCCESS:
      return adapter.addMany(action.payload.users, {
        ...state,
        totalCount: action.payload.totalCount,
        lastQuery: action.payload.page,
        listLoading: false,
        showInitWaitingMessage: false,
      });
    case UserActionTypes.LOAD_USER:
      return {
        ...state,
        selectUser: null,
        response: null,
        error: null,
      };
    case UserActionTypes.USER_CREATED:
    case UserActionTypes.USER_UPDATE:
    case UserActionTypes.USER_CHANGE_PASSWORD:
    case UserActionTypes.USER_RESET_PASSWORD:
    case UserActionTypes.USER_CLEAR:
    case UserActionTypes.USER_ROLE_LOAD:
    case UserActionTypes.USER_ROLE_ADD:
    case UserActionTypes.USER_ROLE_REMOVE:
      return {
        ...state,
        response: null,
        error: null,
      };
    case UserActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        selectUser: action.payload.user,
        response: action.payload.response,
      };
    case UserActionTypes.USER_UPDATE_SUCCESS:
    case UserActionTypes.USER_ROLE_LOAD_SUCCESS:
    case UserActionTypes.USER_ROLE_ADD_SUCCESS:
    case UserActionTypes.USER_ROLE_REMOVE_SUCCESS:
      return {
        ...state,
        selectUser: action.payload.user,
        response: action.payload.response,
      };
    case UserActionTypes.USER_CREATED_SUCCESS:
    case UserActionTypes.USER_CHANGE_PASSWORD_SUCCESS:
    case UserActionTypes.USER_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
      };
    case UserActionTypes.LOAD_USER_FAILURE:
    case UserActionTypes.USER_CREATE_FAILURE:
    case UserActionTypes.USER_UPDATE_FAILURE:
    case UserActionTypes.USER_CHANGE_PASSWORD_FAILURE:
    case UserActionTypes.USER_RESET_PASSWORD_FAILURE:
    case UserActionTypes.USER_ROLE_LOAD_FAILURE:
    case UserActionTypes.USER_ROLE_ADD_FAILURE:
    case UserActionTypes.USER_ROLE_REMOVE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case UserActionTypes.GET_TOTAL_ALL_USER_SUCCESS:
      return {
        ...state,
        totalAll: action.payload,
      };
    case UserActionTypes.GET_TOTAL_ACTIVE_USER_SUCCESS:
      return {
        ...state,
        totalActive: action.payload,
      };
    case UserActionTypes.GET_TOTAL_INACTIVE_USER_SUCCESS:
      return {
        ...state,
        totalInActive: action.payload,
      };
    case UserActionTypes.GET_TOTAL_LOCKED_USER_SUCCESS:
      return {
        ...state,
        totalLocked: action.payload,
      };
    case UserActionTypes.FETCH_ALL_STORES_SUCCESS: {
      const { stores } = action.payload;

      return {
        ...state,
        listStores: stores,
      };
    }
    case UserActionTypes.FETCH_USER_STORES_SUCCESS: {
      const { res } = action.payload;

      return {
        ...state,
        listStoreAssigned: res,
        assignStoreAction: null
      };
    }
    case UserActionTypes.FETCH_STORE_DETAILS_SUCCESS: {
      const { store } = action.payload;

      return {
        ...state,
        storeDetails: store,
      };
    }
    case UserActionTypes.ADD_USER_STORE:
    case UserActionTypes.UPDATE_USER_STORE:
    case UserActionTypes.REMOVE_USER_STORE: {
      return {
        ...state,
        assignStoreAction: null,
      };
    }
    case UserActionTypes.ADD_USER_STORE_SUCCESS:
    case UserActionTypes.UPDATE_USER_STORE_SUCCESS:
    case UserActionTypes.REMOVE_USER_STORE_SUCCESS: {
      const { isSuccess } = action.payload;

      return {
        ...state,
        assignStoreAction: isSuccess,
      };
    }
    case UserActionTypes.SAVE_ALL_SERVICE:
      return {
        ...state,
        listServices: action.payload
      };

    default:
      return state;
  }
}

export const getUserState = createFeatureSelector<UsersState>("users");
