import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

// Translate
import { TranslateModule } from "@ngx-translate/core";

import { SharedModule } from "@shared/shared.module";
import { PartialsModule } from "@core-ui/views/partials/partials.module";

// Routing Module
import { UserManagementRoutingModule } from "./user-management-routing.module";

// Effects
import { UserEffects } from "./_effects/user.effects";
import { AddressEffects } from "./_effects/address.effects";

// Reducer
import { usersReducer } from "./_reducers/user.reducers";
import { addressReducer } from "./_reducers/address.reducers";

import { MODULES_SERVICES } from "./services/index";
import {
  MODULES_COMPONENTS,
  UserCreateDialogComponent,
} from "./components/index";

import { MustMatchDirective } from "./components/user/user-create-dialog/_helpers/must-match.directive";

// Roles
import { roleReducers } from "@module/role-management/_reducers/role.reducers";
import { RoleEffects } from "@module/role-management/_effects/role.effects";
import { RoleService } from "@module/role-management/services";
import { ServicesEffects } from '@module/user-management/_effects/services.effects';

@NgModule({
  declarations: [...MODULES_COMPONENTS, MustMatchDirective],
  entryComponents: [...MODULES_COMPONENTS],
  imports: [
    CommonModule,
    PartialsModule.forRoot(),
    SharedModule.forRoot(),
    TranslateModule.forChild(),
    UserManagementRoutingModule,
    EffectsModule.forFeature([UserEffects, AddressEffects, RoleEffects, ServicesEffects]),
    StoreModule.forFeature("users", usersReducer),
    StoreModule.forFeature("address", addressReducer),
    StoreModule.forFeature("roles", roleReducers),
  ],
  providers: [MODULES_SERVICES, RoleService],
})
export class UserManagementModule {}
