import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { each } from "lodash";
import { QueryResultsModel } from "@app/core-ui/_base/crud";
import { UsersState } from "../_reducers/user.reducers";
import { UserModel } from "../_models/user.model";

export const selectUsersState = createFeatureSelector<UsersState>("users");

export const selectUserById = (userId: number | string) =>
  createSelector(selectUsersState, (usersState) => usersState.entities[userId]);

export const selectUserByEmail = (email: string) =>
  createSelector(selectUsersState, (usersState) => usersState.entities[email]);

export const getSelectUser = () =>
  createSelector(selectUsersState, (usersState) => usersState.selectUser);

export const getRoleInSelectUser = () =>
  createSelector(
    selectUsersState,
    (usersState) => usersState.selectUser.ListRoles
  );

export const selectUsersPageLoading = createSelector(
  selectUsersState,
  (usersState) => usersState.listLoading
);

export const selectUsersActionLoading = createSelector(
  selectUsersState,
  (usersState) => usersState.actionsLoading
);

export const selectUsersShowInitWaitingMessage = createSelector(
  selectUsersState,
  (usersState) => usersState.showInitWaitingMessage
);

export const selectUsersInStore = createSelector(
  selectUsersState,
  (usersState) => {
    const items: UserModel[] = [];

    each(usersState.entities, (element) => {
      items.push(element);
    });

    return new QueryResultsModel(items, usersState.totalCount, "");
  }
);

export const selectHasUsersInStore = createSelector(
  selectUsersState,
  (queryResult) => {
    if (!queryResult.totalCount) {
      return false;
    }

    return true;
  }
);

export const getUserActionError = createSelector(
  selectUsersState,
  (usersState) => usersState.error
);
export const getUserActionResponse = createSelector(
  selectUsersState,
  (usersState) => usersState.response
);

export const getUserTotalStatus = createSelector(selectUsersState, (state) => ({
  all: state.totalAll,
  active: state.totalActive,
  inActive: state.totalInActive,
  locked: state.totalLocked,
}));

export const selectAllStores = createSelector(
  selectUsersState,
  (state) => state.listStores
);

export const selectStoreDetails = createSelector(
  selectUsersState,
  (state) => state.storeDetails
);

export const selectStoresAssigned = createSelector(
  selectUsersState,
  (state) => state.listStoreAssigned
);

export const selectAssignStoreAction = createSelector(
  selectUsersState,
  (state) => state.assignStoreAction
);

export const  selectAllServices = createSelector(
  selectUsersState,
  (state) => state.listServices
);
