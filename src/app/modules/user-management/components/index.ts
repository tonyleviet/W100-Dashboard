import { SettingComponent } from "./setting/setting.component";
import { UserListComponent } from "./user/user-list/user-list.component";
import { UserFormComponent } from "./user/user-form/user-form.component";

// Components
import { UserRolesListComponent } from "./user/user-form/_tabs/user-roles/user-roles-list.component";
import { ChangePasswordComponent } from "./user/user-form/_tabs/change-password/change-password.component";
import { AddressComponent } from "./user/user-form/_tabs/address/address.component";
import { GroupComponent } from "./user/user-form/_tabs/group/group.component";
import { UserCreateDialogComponent } from "./user/user-create-dialog/user-create-dialog.component";
import { AddressFormComponent } from "./user/user-form/_tabs/address/address-form/address-form.component";

// Assign store
import { AssignStoresComponent } from './user/user-form/_tabs/assign-stores/assign-stores.component';
import { AssignStoreFormComponent } from "./user/user-form/_tabs/assign-stores/assign-store-form/assign-store-form.component";
import { StoreAssignedListComponent } from "./user/user-form/_tabs/assign-stores/store-assigned-list/store-assigned-list.component";
import { EditAssignedStoreDialogComponent } from "./user/user-form/_tabs/assign-stores/edit-assigned-store-dialog/edit-assigned-store-dialog.component";

export {
  SettingComponent,
  UserListComponent,
  UserFormComponent,
  UserCreateDialogComponent,
};

export const MODULES_COMPONENTS = [
  SettingComponent,
  UserListComponent,
  UserFormComponent,
  UserCreateDialogComponent,
  UserRolesListComponent,
  ChangePasswordComponent,
  AddressComponent,
  AddressFormComponent,
  GroupComponent,
  AssignStoresComponent,
  AssignStoreFormComponent,
  StoreAssignedListComponent,
  EditAssignedStoreDialogComponent,
];
