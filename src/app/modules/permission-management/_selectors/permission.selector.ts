import { each, cloneDeep, uniqBy, orderBy } from "lodash";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PermissionState } from "../_reducers/permission.reducer";
import { PermissionModel, PermissionMenuModel } from "../_models/permission.model";
import { QueryResultsModel } from "@app/core-ui/_base/crud";
import { MenuItemsModel } from '@app/core-ui/_base/layout/models/menu-config.model';

export const selectPermissionState = createFeatureSelector<PermissionState>(
  "permissions"
);

export const selectPermissionsPageLoading = createSelector(
  selectPermissionState,
  permissionState => permissionState.listLoading
);

export const selectPermissionsShowInitWaitingMessage = createSelector(
  selectPermissionState,
  rolesState => rolesState.showInitWaitingMessage
);

export const selectPermissionsInStore = createSelector(
  selectPermissionState,
  permissionsState => {
    const items: PermissionModel[] = [];

    if (permissionsState) {
      each(permissionsState.entities, permission => {
        items.push(permission);
      });
    }

    return new QueryResultsModel(items, 0, "");
  }
);

export const selectPermissionTypes = createSelector(
  selectPermissionState,
  permissionsState => permissionsState.permissionTypes
);

export const selectUpdateStatus = createSelector(
  selectPermissionState,
  permissionsState => permissionsState.updateSuccess
);

export const selectPermissionMenuLoading = createSelector(
  selectPermissionState,
  state => state.menuLoading
);
export const selectPermissionMenu = createSelector(
  selectPermissionState,
  state => state.menu
);
export const selectPermissionMenuConfig = createSelector(
  selectPermissionState,
  state => {
    const items: MenuItemsModel[] = [];

    if (state) {
      const sortOrderMenu = orderBy(state.menu, ['OrderNumber'], ['asc']);
      each(sortOrderMenu, (menu: PermissionMenuModel) => {
        items.push(convertMenuApiToConfig(menu));
      })
    }

    return items;
  }
);
export const selectUserPermissionByUrl = (url: string) => createSelector(
  selectPermissionState,
  state => {
    let item: PermissionMenuModel = undefined;
    if (state) {
      const result = state.userPermission.filter((i: PermissionMenuModel) =>
        i.Url && url.toLowerCase().includes(i.Url.toLowerCase())
      );
      item = result.length > 0 ? result[0] : null;
    }
    return {
      isLoad: state.isLoadMenuPermission,
      permission: item
    };
  }
)

const convertMenuApiToConfig = (data: PermissionMenuModel) => {
  let menuConfigItem = new MenuItemsModel();
  menuConfigItem.id = data.PermissionId;
  menuConfigItem.title = data.Name;
  if (!data.ParentId) {
    menuConfigItem.root = true;
    menuConfigItem.bullet = 'dot';
    menuConfigItem.icon = data.Icon;
  }
  if (data.Url) {
    menuConfigItem.page = data.Url;
  }
  if (data.Children && data.Children.length > 0) {
    menuConfigItem.submenu = [];
    each(data.Children, (childrenData: PermissionMenuModel) => {
      menuConfigItem.submenu.push(convertMenuApiToConfig(childrenData));
    });
  }
  return menuConfigItem;
}
