import { select, Store } from '@ngrx/store';
import { AppState } from '@app/core-ui/reducers';
import { BaseDataSource, QueryResultsModel } from '@app/core-ui/_base/crud';
import { selectPermissionsInStore, selectPermissionsPageLoading, selectPermissionsShowInitWaitingMessage } from '../_selectors/permission.selector';

export class PermissionsDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectPermissionsPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectPermissionsShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectPermissionsInStore)
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.items.length);
			this.entitySubject.next(response.items);
		});
	}
}