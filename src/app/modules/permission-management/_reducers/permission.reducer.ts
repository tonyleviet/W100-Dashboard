import { EntityState, createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { filter, keyBy, omit } from "lodash";
import { PermissionModel, PermissionMenuModel } from "../_models/permission.model";
import {
  PermissionActions,
  PermissionActionTypes
} from "../_actions/permission.action";
import { createFeatureSelector } from "@ngrx/store";

export interface PermissionState extends EntityState<PermissionModel> {
  listLoading: boolean;
  actionsLoading: boolean;
  showInitWaitingMessage: boolean;
  allPermissions: PermissionModel[];
  permissionTypes: string[];
  updateSuccess: boolean;
  isLoadMenuPermission: boolean;
  menuLoading: boolean;
  menu: PermissionMenuModel[];
  userPermission: PermissionMenuModel[];
}

export const adapter: EntityAdapter<PermissionModel> = createEntityAdapter<
  PermissionModel
>({
  selectId: (permission: PermissionModel) => permission.PermissionId
});

const initialPermissionState: PermissionState = adapter.getInitialState({
  listLoading: false,
  actionsLoading: false,
  showInitWaitingMessage: true,
  allPermissions: [],
  permissionTypes: [],
  // Update
  updateSuccess: false,
  // Permission menu
  isLoadMenuPermission: false,
  menuLoading: false,
  menu: [],
  userPermission: [],
});

export function permissionReducers(
  state = initialPermissionState,
  action: PermissionActions
): PermissionState {
  switch (action.type) {
    case PermissionActionTypes.PERMISSION_PAGE_TOGGLE_LOADING:
      return {
        ...state,
        listLoading: action.payload.isLoading
      };
    case PermissionActionTypes.PERMISSION_ACTION_TOGGLE_LOADING:
      return {
        ...state,
        listLoading: action.payload.isLoading
      };
    case PermissionActionTypes.LOAD_PERMISSIONS:
      return adapter.removeAll({
        ...state,
        listLoading: true,
        showInitWaitingMessage: true,
        allPermissions: []
      });
    case PermissionActionTypes.LOAD_PERMISSIONS_SUCCESS:
      return adapter.addMany(action.payload.permissions, {
        ...state,
        listLoading: false,
        showInitWaitingMessage: false,
        allPermissions: action.payload.permissions
      });
    case PermissionActionTypes.FILTER_PERMISSIONS: {
      const { keyword } = action.payload;
      return {
        ...state,
        listLoading: false,
        entities: keyBy(
          filter(state.allPermissions, permission => {
            const kw = keyword.trim();
            return (
              (permission.PermissionId || "")
                .toLowerCase()
                .indexOf(kw.toLowerCase()) !== -1 || kw === ""
            );
          }),
          "PermissionId"
        )
      };
    }

    case PermissionActionTypes.DETECT_PERMISSION_TYPES: {
      const { permission } = action.payload;

      return {
        ...state,
        permissionTypes: permission.Permissions
          ? Object.keys(omit(permission.Permissions.All || [], "ObjectId"))
          : []
      };
    }

    case PermissionActionTypes.UPDATE_PERMISSION: {
      return {
        ...state,
        listLoading: true
      };
    }

    case PermissionActionTypes.UPDATE_PERMISSION_SUCCESS: {
      const { updated } = action.payload;
      return {
        ...state,
        updateSuccess: updated,
        listLoading: false
      };
    }

    case PermissionActionTypes.UPDATE_PERMISSION_FAILURE: {
      const { updated } = action.payload;
      return {
        ...state,
        updateSuccess: updated,
        listLoading: false
      };
    }

    case PermissionActionTypes.PERMISSION_MENU_TOGGLE_LOADING: {
      return {
        ...state,
        menuLoading: action.payload
      };
    }
    case PermissionActionTypes.LOAD_PERMISSIONS_MENU: {
      return {
        ...state,
        isLoadMenuPermission: false,
        menuLoading: true,
        menu: []
      }
    }
    case PermissionActionTypes.SAVE_PERMISSIONS_MENU: {
      return {
        ...state,
        isLoadMenuPermission: true,
        menuLoading: false,
        menu: action.payload.menu,
        userPermission: action.payload.userPermission
      }
    }

    default:
      return state;
  }
}

export const getPermissionState = createFeatureSelector<PermissionState>(
  "permissions"
);
