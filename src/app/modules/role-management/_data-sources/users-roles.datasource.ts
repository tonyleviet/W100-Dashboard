import { Store, select } from '@ngrx/store';
import { BaseDataSource, QueryResultsModel } from '@core-ui/_base/crud';
import { AppState } from '@core-ui/reducers';
import { selectUsersRoleInStore, selectUsersRoleShowInitWaitingMessage, selectUsersRolePageLoading } from '../_selectors/users-role.selectors';

export class UsersRolesDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();
		
		this.loading$ = this.store.pipe(
			select(selectUsersRolePageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectUsersRoleShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectUsersRoleInStore)
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount)
			this.entitySubject.next(response.items);
		});
	}
}