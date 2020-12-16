export class RoleModel {
  RoleId: string;
	RoleName: string;
	Description: string;

	clear() {
		this.RoleName = '';
	}
}

export class RoleListResultModel {
	Roles: Array<RoleModel>;
}
