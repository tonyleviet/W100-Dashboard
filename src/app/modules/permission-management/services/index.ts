import { PermissionService } from './permission.service';
import { RoleService } from '@app/modules/role-management/services';
import { UserService } from '@app/modules/user-management';
import { LayoutUtilsService } from '@app/core-ui/_base/crud';

export const MODULE_SERVICES = [
	PermissionService,
	RoleService,
	UserService,
	LayoutUtilsService,
];