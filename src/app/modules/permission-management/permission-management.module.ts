import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from '@app/shared/shared.module';
import { PartialsModule } from "@core-ui/views/partials/partials.module";

import { MODULE_SERVICES } from "./services";

import { PermissionManagementRoutingModule } from "./permission-management-routing.module";

import { PermissionManagementComponent } from "./components/permissions/list/permission-management.component";
import { PermissionEditDialogComponent } from "./components/permissions/edit/permission-edit.dialog.component";

import { PermissionEffects } from "./_effects/permission.effect";
import { permissionReducers } from "./_reducers/permission.reducer";

import { RoleEffects } from '@module/role-management/_effects/role.effects';
import { roleReducers } from '@module/role-management/_reducers/role.reducers';
import { usersRoleReducers } from '@module/role-management/_reducers/users-role.reducers';
import { UserRoleEffects } from '@module/role-management/_effects/user-role.effects';

import { DeleteEntityDialogComponent } from '@core-ui/views/partials/content/crud';

@NgModule({
  declarations: [
    PermissionManagementComponent,
    PermissionEditDialogComponent
  ],
  entryComponents: [PermissionEditDialogComponent, DeleteEntityDialogComponent],
  imports: [
    CommonModule,
    PermissionManagementRoutingModule,
    PartialsModule.forRoot(),
    SharedModule.forRoot(),
    EffectsModule.forFeature([PermissionEffects, RoleEffects, UserRoleEffects]),
    StoreModule.forFeature("permissions", permissionReducers),
    StoreModule.forFeature("roles", roleReducers),
    StoreModule.forFeature("users-role", usersRoleReducers)
  ],
  providers: [
    MODULE_SERVICES,
  ],
})
export class PermissionManagementModule {}
