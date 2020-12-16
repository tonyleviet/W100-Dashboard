import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { filter } from "lodash";
import { createFeatureSelector } from "@ngrx/store";
import { RoleModel } from "../_models/role.model";
import { RoleActions, RoleActionTypes } from "../_actions/role.actions";

export interface RolesState extends EntityState<RoleModel> {
  listLoading: boolean;
  actionsLoading: boolean;
  showInitWaitingMessage: boolean;
  filteredRoles: RoleModel[];
  createRoleSuccess: boolean;
}

export const adapter: EntityAdapter<RoleModel> = createEntityAdapter<RoleModel>(
  {
    selectId: (role: RoleModel) => role.RoleName
  }
);

const initialRolesState: RolesState = adapter.getInitialState({
  listLoading: false,
  actionsLoading: false,
  showInitWaitingMessage: true,
  filteredRoles: [],
  createRoleSuccess: false
});

export function roleReducers(
  state = initialRolesState,
  action: RoleActions
): RolesState {
  switch (action.type) {
    case RoleActionTypes.ROLES_PAGE_TOGGLE_LOADING:
      return {
        ...state,
        listLoading: action.payload.isLoading,
      };
    case RoleActionTypes.ROLES_ACTION_TOGGLE_LOADING:
      return {
        ...state,
        listLoading: action.payload.isLoading,
      };
    case RoleActionTypes.LOAD_ROLES_SUCCESS:
      return adapter.addMany(action.payload.roles, {
        ...initialRolesState,
        listLoading: false,
        showInitWaitingMessage: false,
        filteredRoles: action.payload.roles
      });
    case RoleActionTypes.ROLE_CREATED:
      return {
        ...state,
        createRoleSuccess: action.payload.created
      };
    case RoleActionTypes.FILTER_ROLES: {
      const { keyword } = action.payload;

      return {
        ...state,
        listLoading: false,
        filteredRoles: filter(state.entities, role => {
          const kw = keyword.trim();
          return (
            (role.RoleName || "").toLowerCase().indexOf(kw.toLowerCase()) !== -1 ||
            kw === ""
          );
        })
      };
    }
    default:
      return state;
  }
}

export const getRoleState = createFeatureSelector<RolesState>("roles");
