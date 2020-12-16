import { RoleService } from './role.service';
import { UserService } from '@app/modules/user-management';
import { LayoutUtilsService } from '@app/core-ui/_base/crud';

export * from './role.service';

export const MODULE_SERVICES = [
  RoleService,
  UserService,
  LayoutUtilsService
];
