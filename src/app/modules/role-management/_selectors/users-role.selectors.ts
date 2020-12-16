import { createFeatureSelector, createSelector } from "@ngrx/store";
import { each } from "lodash";
import { QueryResultsModel } from "@app/core-ui/_base/crud";
import { UsersRoleState } from "../_reducers/users-role.reducers";
import { UserModel } from "@app/modules/user-management/_models/user.model";
import { of } from "rxjs";

export const selectUsersRoleState = createFeatureSelector<UsersRoleState>(
  "users-role"
);

export const selectUsersRolePageLoading = createSelector(
  selectUsersRoleState,
  rolesState => rolesState.listLoading
);

export const selectUsersRoleShowInitWaitingMessage = createSelector(
  selectUsersRoleState,
  rolesState => rolesState.showInitWaitingMessage
);

export const selectUsersRoleInStore = createSelector(
  selectUsersRoleState,
  usersRoleState => {
    const items: UserModel[] = [];

    each(usersRoleState.entities, element => {
      items.push(element);
    });

    return new QueryResultsModel(items, usersRoleState.totalCount, "");
  }
);

export const selectUsersAC = createSelector(
  selectUsersRoleState,
  usersRoleState => {
    return {
      users: usersRoleState.usersAC,
      isLoading$: of(usersRoleState.isACLoading)
    };
  }
);
