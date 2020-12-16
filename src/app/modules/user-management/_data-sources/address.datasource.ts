import { Store, select } from '@ngrx/store';
import { AppState } from '@core-ui/reducers';
import { BaseDataSource, QueryResultsModel } from '@core-ui/_base/crud';

import {
  selectAddressPageLoading,  selectAddressInStore
} from '../_selectors/address.selectors';

export class AddressDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectAddressPageLoading)
		);

		this.store.pipe(
			select(selectAddressInStore)
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
