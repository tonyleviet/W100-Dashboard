import { createFeatureSelector, createSelector } from '@ngrx/store';
import { each } from 'lodash';
import { QueryResultsModel } from '@app/core-ui/_base/crud';
import { RolesState } from '../_reducers/role.reducers';
import { RoleModel } from '../_models/role.model';

export const selectRolesState = createFeatureSelector<RolesState>('roles');

export const selectRoleById = (name: string) => createSelector(
  selectRolesState,
  rolesState => rolesState.entities[name]
);

export const selectRolesPageLoading = createSelector(
	selectRolesState,
	rolesState => rolesState.listLoading
);

export const selectRolesShowInitWaitingMessage = createSelector(
	selectRolesState,
	rolesState => rolesState.showInitWaitingMessage
);

export const selectRolesInStore = createSelector(
	selectRolesState,
	rolesState => {
		const items: RoleModel[] = [];

		each(rolesState.filteredRoles || [], roleName => {
			items.push(roleName);
		});

		return new QueryResultsModel(items, 0, '');
	}
);

export const selectCreatedRoleSuccess = createSelector(
	selectRolesState,
	rolesState => rolesState.createRoleSuccess
);
