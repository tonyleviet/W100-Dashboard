import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from '@app/shared/shared.module';
import { PartialsModule, PARTIALS_MODULE_ENTRY_COMPONENTS } from "@core-ui/views/partials/partials.module";

import { RoleManagementRoutingModule } from "./role-management-routing.module";

// Effects
import { RoleEffects } from "./_effects/role.effects";
import { UserRoleEffects } from "./_effects/user-role.effects";

// Reducer
import { roleReducers } from "./_reducers/role.reducers";
import { usersRoleReducers } from "./_reducers/users-role.reducers";

import { MODULE_SERVICES } from "./services/index";
import { MODULE_COMPONENTS } from "./components/index";

@NgModule({
  declarations: [MODULE_COMPONENTS],
  imports: [
    CommonModule,
    PartialsModule.forRoot(),
    SharedModule.forRoot(),
    RoleManagementRoutingModule,
    EffectsModule.forFeature([RoleEffects, UserRoleEffects]),
    StoreModule.forFeature("roles", roleReducers),
    StoreModule.forFeature("users-role", usersRoleReducers)
  ],
  providers: [
    MODULE_SERVICES,
  ]
})
export class RoleManagementModule {}
