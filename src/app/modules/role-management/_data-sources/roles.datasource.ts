import { Store, select } from '@ngrx/store';
import { BaseDataSource, QueryResultsModel } from '@core-ui/_base/crud';
import { AppState } from '@core-ui/reducers';
import { selectRolesInStore, selectRolesShowInitWaitingMessage, selectRolesPageLoading } from '../_selectors/role.selectors';

export class RolesDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();
		
		this.loading$ = this.store.pipe(
			select(selectRolesPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectRolesShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectRolesInStore)
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.items.length)
			this.entitySubject.next(response.items);
		});
	}
}